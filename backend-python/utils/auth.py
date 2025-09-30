import jwt
import os
from typing import Optional, Dict, Any
from datetime import datetime, timedelta
import logging

logger = logging.getLogger(__name__)

# JWT configuration
JWT_SECRET = os.getenv("JWT_SECRET", "mySecretKey")
JWT_ALGORITHM = "HS256"
JWT_EXPIRATION_HOURS = 24

def verify_token(token: str) -> Optional[Dict[str, Any]]:
    """
    Verify JWT token and return user data
    """
    try:
        # Decode JWT token
        payload = jwt.decode(
            token,
            JWT_SECRET,
            algorithms=[JWT_ALGORITHM]
        )
        
        # Check if token is expired
        exp = payload.get('exp')
        if exp and datetime.utcfromtimestamp(exp) < datetime.utcnow():
            logger.warning("Token has expired")
            return None
        
        # Return user data
        return {
            'user_id': payload.get('sub'),
            'username': payload.get('username'),
            'email': payload.get('email'),
            'role': payload.get('role'),
            'customer_support_id': payload.get('customer_support_id')
        }
        
    except jwt.ExpiredSignatureError:
        logger.warning("Token has expired")
        return None
    except jwt.InvalidTokenError:
        logger.warning("Invalid token")
        return None
    except Exception as e:
        logger.error(f"Error verifying token: {str(e)}")
        return None

def create_token(user_data: Dict[str, Any]) -> str:
    """
    Create JWT token for user
    """
    try:
        # Set expiration time
        expiration = datetime.utcnow() + timedelta(hours=JWT_EXPIRATION_HOURS)
        
        # Create payload
        payload = {
            'sub': user_data.get('user_id'),
            'username': user_data.get('username'),
            'email': user_data.get('email'),
            'role': user_data.get('role'),
            'customer_support_id': user_data.get('customer_support_id'),
            'exp': expiration,
            'iat': datetime.utcnow()
        }
        
        # Generate token
        token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)
        return token
        
    except Exception as e:
        logger.error(f"Error creating token: {str(e)}")
        return None

def is_admin(user_data: Dict[str, Any]) -> bool:
    """
    Check if user is admin
    """
    return user_data.get('role') == 'ADMIN'

def is_business(user_data: Dict[str, Any]) -> bool:
    """
    Check if user is business
    """
    return user_data.get('role') in ['ADMIN', 'BUSINESS']

def is_customer(user_data: Dict[str, Any]) -> bool:
    """
    Check if user is customer
    """
    return user_data.get('role') in ['ADMIN', 'CUSTOMER']

def has_permission(user_data: Dict[str, Any], required_role: str) -> bool:
    """
    Check if user has required permission
    """
    user_role = user_data.get('role')
    
    if required_role == 'ADMIN':
        return user_role == 'ADMIN'
    elif required_role == 'BUSINESS':
        return user_role in ['ADMIN', 'BUSINESS']
    elif required_role == 'CUSTOMER':
        return user_role in ['ADMIN', 'CUSTOMER']
    
    return False
