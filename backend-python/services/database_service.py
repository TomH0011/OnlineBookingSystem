import mysql.connector
import os
import logging
from typing import Optional, List, Dict, Any
from datetime import datetime
import asyncio
from contextlib import asynccontextmanager

logger = logging.getLogger(__name__)

class DatabaseService:
    def __init__(self):
        self.db_config = {
            'host': os.getenv('DB_HOST', 'localhost'),
            'port': int(os.getenv('DB_PORT', 3306)),
            'user': os.getenv('DB_USERNAME', 'root'),
            'password': os.getenv('DB_PASSWORD', 'password'),
            'database': os.getenv('DB_NAME', 'booking_system'),
            'charset': 'utf8mb4',
            'autocommit': True
        }
    
    @asynccontextmanager
    async def get_connection(self):
        """
        Get database connection with proper error handling
        """
        connection = None
        try:
            connection = mysql.connector.connect(**self.db_config)
            yield connection
        except Exception as e:
            logger.error(f"Database connection error: {str(e)}")
            raise e
        finally:
            if connection and connection.is_connected():
                connection.close()
    
    async def store_conversation(self, report_id: str, user_id: int, 
                               user_message: str, ai_response: str) -> bool:
        """
        Store conversation in database
        """
        try:
            async with self.get_connection() as conn:
                cursor = conn.cursor()
                
                # Get chat session ID
                cursor.execute(
                    "SELECT id FROM chat_sessions WHERE report_id = %s",
                    (report_id,)
                )
                session_result = cursor.fetchone()
                
                if not session_result:
                    # Create new chat session if it doesn't exist
                    cursor.execute(
                        "INSERT INTO chat_sessions (report_id, user_id, status) VALUES (%s, %s, 'ACTIVE')",
                        (report_id, user_id)
                    )
                    session_id = cursor.lastrowid
                else:
                    session_id = session_result[0]
                
                # Store user message
                cursor.execute(
                    "INSERT INTO chat_messages (chat_session_id, content, sender_type) VALUES (%s, %s, 'USER')",
                    (session_id, user_message)
                )
                
                # Store AI response
                cursor.execute(
                    "INSERT INTO chat_messages (chat_session_id, content, sender_type) VALUES (%s, %s, 'AI')",
                    (session_id, ai_response)
                )
                
                return True
                
        except Exception as e:
            logger.error(f"Error storing conversation: {str(e)}")
            return False
    
    async def get_chat_history(self, report_id: str) -> List[Dict[str, Any]]:
        """
        Get chat history for a report
        """
        try:
            async with self.get_connection() as conn:
                cursor = conn.cursor(dictionary=True)
                
                # Get chat session and messages
                cursor.execute("""
                    SELECT 
                        cs.id as session_id,
                        cs.report_id,
                        cs.status,
                        cs.created_at as session_created,
                        cs.updated_at as session_updated,
                        cm.id as message_id,
                        cm.content,
                        cm.sender_type,
                        cm.created_at as message_created
                    FROM chat_sessions cs
                    LEFT JOIN chat_messages cm ON cs.id = cm.chat_session_id
                    WHERE cs.report_id = %s
                    ORDER BY cm.created_at ASC
                """, (report_id,))
                
                results = cursor.fetchall()
                
                if not results:
                    return []
                
                # Group messages by session
                session_data = {
                    'report_id': results[0]['report_id'],
                    'status': results[0]['status'],
                    'created_at': results[0]['session_created'],
                    'updated_at': results[0]['session_updated'],
                    'messages': []
                }
                
                for row in results:
                    if row['message_id']:  # Only add if message exists
                        session_data['messages'].append({
                            'id': row['message_id'],
                            'content': row['content'],
                            'sender_type': row['sender_type'],
                            'created_at': row['message_created']
                        })
                
                return [session_data]
                
        except Exception as e:
            logger.error(f"Error getting chat history: {str(e)}")
            return []
    
    async def escalate_chat(self, report_id: str) -> bool:
        """
        Escalate chat to human support
        """
        try:
            async with self.get_connection() as conn:
                cursor = conn.cursor()
                
                # Update chat session status to escalated
                cursor.execute(
                    "UPDATE chat_sessions SET status = 'ESCALATED', updated_at = NOW() WHERE report_id = %s",
                    (report_id,)
                )
                
                return cursor.rowcount > 0
                
        except Exception as e:
            logger.error(f"Error escalating chat: {str(e)}")
            return False
    
    async def close_chat_session(self, report_id: str) -> bool:
        """
        Close chat session
        """
        try:
            async with self.get_connection() as conn:
                cursor = conn.cursor()
                
                # Update chat session status to closed
                cursor.execute(
                    "UPDATE chat_sessions SET status = 'CLOSED', updated_at = NOW() WHERE report_id = %s",
                    (report_id,)
                )
                
                return cursor.rowcount > 0
                
        except Exception as e:
            logger.error(f"Error closing chat session: {str(e)}")
            return False
    
    async def get_user_chat_sessions(self, user_id: int) -> List[Dict[str, Any]]:
        """
        Get all chat sessions for a user
        """
        try:
            async with self.get_connection() as conn:
                cursor = conn.cursor(dictionary=True)
                
                cursor.execute("""
                    SELECT 
                        id,
                        report_id,
                        status,
                        created_at,
                        updated_at
                    FROM chat_sessions
                    WHERE user_id = %s
                    ORDER BY created_at DESC
                """, (user_id,))
                
                return cursor.fetchall()
                
        except Exception as e:
            logger.error(f"Error getting user chat sessions: {str(e)}")
            return []
    
    async def get_chat_statistics(self) -> Dict[str, Any]:
        """
        Get chat statistics for admin dashboard
        """
        try:
            async with self.get_connection() as conn:
                cursor = conn.cursor(dictionary=True)
                
                # Get total sessions
                cursor.execute("SELECT COUNT(*) as total_sessions FROM chat_sessions")
                total_sessions = cursor.fetchone()['total_sessions']
                
                # Get sessions by status
                cursor.execute("""
                    SELECT status, COUNT(*) as count
                    FROM chat_sessions
                    GROUP BY status
                """)
                status_counts = {row['status']: row['count'] for row in cursor.fetchall()}
                
                # Get recent activity
                cursor.execute("""
                    SELECT COUNT(*) as recent_sessions
                    FROM chat_sessions
                    WHERE created_at >= DATE_SUB(NOW(), INTERVAL 24 HOUR)
                """)
                recent_sessions = cursor.fetchone()['recent_sessions']
                
                return {
                    'total_sessions': total_sessions,
                    'status_counts': status_counts,
                    'recent_sessions_24h': recent_sessions
                }
                
        except Exception as e:
            logger.error(f"Error getting chat statistics: {str(e)}")
            return {}
