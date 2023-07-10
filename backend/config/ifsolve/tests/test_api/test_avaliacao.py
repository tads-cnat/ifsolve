import requests
import pytest

BASE_URL = "http://localhost:8000"

def test_authenticated_route():
    headers = {
        "Authorization": "Token 56308bd1b840cf3ac0fbd09bf7a83e9aa19af08d"
    }
    
    route_url = BASE_URL + "/avaliacao/"
    
    response = requests.get(route_url, headers=headers)
    
    assert response.status_code == 200

if __name__ == "__main__":
    pytest.main()

