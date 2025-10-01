import React, { useState, useEffect, useRef } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Textarea,
  Chip,
  Avatar,
  ScrollShadow
} from '@heroui/react';
import {
  PaperAirplaneIcon,
  MicrophoneIcon,
  PhoneIcon,
  ChatBubbleLeftRightIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentSession, setCurrentSession] = useState(null);
  const [chatSessions, setChatSessions] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const startNewChat = async () => {
    try {
      // Simulate API call
      const newSession = {
        id: Date.now(),
        reportId: Math.random().toString(36).substr(2, 7).toUpperCase(),
        status: 'active',
        createdAt: new Date().toISOString()
      };
      
      setCurrentSession(newSession);
      setChatSessions(prev => [newSession, ...prev]);
      setMessages([]);
      toast.success('New chat session started!');
    } catch (error) {
      toast.error('Failed to start chat session');
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !currentSession) return;

    const userMessage = {
      id: Date.now(),
      content: newMessage,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage = {
        id: Date.now() + 1,
        content: "Thank you for your message! I'm here to help you with your booking needs. How can I assist you today?",
        sender: 'ai',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const startVoiceCall = () => {
    toast.info('Voice call feature coming soon!');
  };

  const endChat = () => {
    if (currentSession) {
      setCurrentSession(null);
      setMessages([]);
      toast.success('Chat session ended');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Chat Sessions Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-foreground">Chat Sessions</h2>
              <Button
                color="primary"
                size="sm"
                startContent={<ChatBubbleLeftRightIcon className="w-4 h-4" />}
                onPress={startNewChat}
              >
                New Chat
              </Button>
            </CardHeader>
            <CardBody>
              <div className="space-y-2">
                {chatSessions.map((session) => (
                  <div
                    key={session.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      currentSession?.id === session.id
                        ? 'bg-primary-50 border border-primary'
                        : 'hover:bg-default-50'
                    }`}
                    onClick={() => setCurrentSession(session)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">Report #{session.reportId}</p>
                        <p className="text-xs text-foreground-600">
                          {new Date(session.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <Chip
                        color={session.status === 'active' ? 'success' : 'default'}
                        size="sm"
                        variant="flat"
                      >
                        {session.status}
                      </Chip>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Main Chat Area */}
        <div className="lg:col-span-3">
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="flex justify-between items-center border-b border-divider">
              <div className="flex items-center space-x-3">
                <Avatar
                  icon={<ChatBubbleLeftRightIcon className="w-5 h-5" />}
                  className="bg-primary text-white"
                />
                <div>
                  <h3 className="font-semibold text-foreground">
                    {currentSession ? `Report #${currentSession.reportId}` : 'AI Support Chat'}
                  </h3>
                  <p className="text-sm text-foreground-600">
                    {currentSession ? 'Active session' : 'Start a new chat to begin'}
                  </p>
                </div>
              </div>
              {currentSession && (
                <div className="flex space-x-2">
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    onPress={startVoiceCall}
                  >
                    <PhoneIcon className="w-4 h-4" />
                  </Button>
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    color="danger"
                    onPress={endChat}
                  >
                    <XMarkIcon className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </CardHeader>

            <CardBody className="flex-1 flex flex-col">
              {currentSession ? (
                <>
                  {/* Messages */}
                  <ScrollShadow className="flex-1 mb-4">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${
                            message.sender === 'user' ? 'justify-end' : 'justify-start'
                          }`}
                        >
                          <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                              message.sender === 'user'
                                ? 'bg-primary text-white'
                                : 'bg-default-100 text-foreground'
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <p className="text-xs opacity-70 mt-1">
                              {new Date(message.timestamp).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      ))}
                      {isTyping && (
                        <div className="flex justify-start">
                          <div className="bg-default-100 px-4 py-2 rounded-lg">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-foreground-400 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-foreground-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                              <div className="w-2 h-2 bg-foreground-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            </div>
                          </div>
                        </div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollShadow>

                  {/* Message Input */}
                  <div className="flex space-x-2">
                    <Textarea
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                      variant="bordered"
                      minRows={1}
                      maxRows={3}
                      className="flex-1"
                    />
                    <Button
                      color="primary"
                      isIconOnly
                      onPress={sendMessage}
                      disabled={!newMessage.trim()}
                    >
                      <PaperAirplaneIcon className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="bordered"
                      isIconOnly
                      onPress={startVoiceCall}
                    >
                      <MicrophoneIcon className="w-4 h-4" />
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <ChatBubbleLeftRightIcon className="w-16 h-16 text-foreground-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Start a New Chat
                    </h3>
                    <p className="text-foreground-600 mb-4">
                      Get instant help from our AI assistant
                    </p>
                    <Button
                      color="primary"
                      startContent={<ChatBubbleLeftRightIcon className="w-4 h-4" />}
                      onPress={startNewChat}
                    >
                      Start Chat
                    </Button>
                  </div>
                </div>
              )}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
