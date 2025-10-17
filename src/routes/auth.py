from flask import Blueprint, jsonify, request
from werkzeug.security import generate_password_hash, check_password_hash
from src.models.user import User, db
import jwt
import datetime
from functools import wraps

auth_bp = Blueprint('auth', __name__)

# Secret key for JWT (should match Flask app secret key)
SECRET_KEY = 'asdf#FGSgvasgf$5$WGT'

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        
        if not token:
            return jsonify({'message': 'Token is missing!'}), 401
        
        try:
            # Remove 'Bearer ' prefix if present
            if token.startswith('Bearer '):
                token = token[7:]
            
            data = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
            current_user = User.query.get(data['user_id'])
            
            if not current_user:
                return jsonify({'message': 'User not found!'}), 401
                
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired!'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Token is invalid!'}), 401
        
        return f(current_user, *args, **kwargs)
    
    return decorated

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.json
    
    # Validate required fields
    if not data.get('email') or not data.get('password') or not data.get('name'):
        return jsonify({'message': 'Missing required fields'}), 400
    
    # Check if user already exists
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'message': 'User already exists'}), 409
    
    # Create username from email
    username = data['email'].split('@')[0]
    
    # Check if username already exists, if so, append a number
    base_username = username
    counter = 1
    while User.query.filter_by(username=username).first():
        username = f"{base_username}{counter}"
        counter += 1
    
    # Hash password
    hashed_password = generate_password_hash(data['password'], method='pbkdf2:sha256')
    
    # Create new user
    new_user = User(
        username=username,
        email=data['email'],
        password=hashed_password,
        name=data['name'],
        company=data.get('company', ''),
        bio=data.get('bio', '')
    )
    
    db.session.add(new_user)
    db.session.commit()
    
    # Generate token
    token = jwt.encode({
        'user_id': new_user.id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=30)
    }, SECRET_KEY, algorithm='HS256')
    
    return jsonify({
        'message': 'User created successfully',
        'token': token,
        'user': new_user.to_dict()
    }), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    
    # Validate required fields
    if not data.get('email') or not data.get('password'):
        return jsonify({'message': 'Missing email or password'}), 400
    
    # Find user by email
    user = User.query.filter_by(email=data['email']).first()
    
    if not user:
        return jsonify({'message': 'Invalid credentials'}), 401
    
    # Check password
    if not check_password_hash(user.password, data['password']):
        return jsonify({'message': 'Invalid credentials'}), 401
    
    # Generate token
    token = jwt.encode({
        'user_id': user.id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=30)
    }, SECRET_KEY, algorithm='HS256')
    
    return jsonify({
        'message': 'Login successful',
        'token': token,
        'user': user.to_dict()
    }), 200

@auth_bp.route('/profile', methods=['GET'])
@token_required
def get_profile(current_user):
    return jsonify(current_user.to_dict()), 200

@auth_bp.route('/profile', methods=['PUT'])
@token_required
def update_profile(current_user):
    data = request.json
    
    # Update user fields
    if 'name' in data:
        current_user.name = data['name']
    if 'email' in data:
        # Check if email is already taken by another user
        existing_user = User.query.filter_by(email=data['email']).first()
        if existing_user and existing_user.id != current_user.id:
            return jsonify({'message': 'Email already in use'}), 409
        current_user.email = data['email']
    if 'company' in data:
        current_user.company = data['company']
    if 'bio' in data:
        current_user.bio = data['bio']
    
    db.session.commit()
    
    return jsonify({
        'message': 'Profile updated successfully',
        'user': current_user.to_dict()
    }), 200

@auth_bp.route('/contact', methods=['POST'])
def contact():
    data = request.json
    
    # Validate required fields
    if not data.get('email') or not data.get('message'):
        return jsonify({'message': 'Missing required fields'}), 400
    
    # In a real application, you would save this to a database or send an email
    # For now, we'll just return a success message
    
    return jsonify({
        'message': 'Message received successfully'
    }), 200

@auth_bp.route('/waitlist', methods=['POST'])
def waitlist():
    data = request.json
    
    # Validate required fields
    if not data.get('email'):
        return jsonify({'message': 'Email is required'}), 400
    
    # In a real application, you would save this to a database
    # For now, we'll just return a success message
    
    return jsonify({
        'message': 'Added to waitlist successfully'
    }), 200

