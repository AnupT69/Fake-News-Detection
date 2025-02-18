from pydantic import BaseModel

class NewsInput(BaseModel):
    text: str


'''
Pydantic: Data Validation in Python
Pydantic is a data validation and settings management library in Python. It is commonly used with FastAPI to ensure that incoming API requests have the correct structure and data types.

Why Use Pydantic?
Automatic Data Validation
Type Checking for API Requests & Responses 
Converts JSON Data into Python Objects 
Handles Default Values, Custom Validation, and Error Handling 
'''