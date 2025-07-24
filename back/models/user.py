class User:
    def __init__(self, name, last_name, email, password, profile_image_url, is_premium=False):
        self.name = name
        self.last_name = last_name
        self.email = email
        self.password = password
        self.profile_image_url = profile_image_url
        self.is_premium = is_premium

    def to_dict(self):
        return {
            "name": self.name,
            "last_name": self.last_name,
            "email": self.email,
            "password": self.password,
            "profile_image_url": self.profile_image_url,
            "is_premium": self.is_premium
        }