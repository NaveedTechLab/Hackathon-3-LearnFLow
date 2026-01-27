# Example of how to invoke another Dapr service
import requests

def invoke_service(target_app_id, method, data=None):
    """
    Invoke another Dapr service using service invocation
    """
    dapr_base_url = "http://localhost:3500"
    url = f"{dapr_base_url}/v1.0/invoke/{target_app_id}/method/{method}"
    
    try:
        if data:
            response = requests.post(url, json=data)
        else:
            response = requests.get(url)
        
        return response.json()
    except Exception as e:
        print(f"Error invoking service {target_app_id}: {e}")
        return None

# Usage example:
# result = invoke_service("other-service", "api/data", {"param": "value"})
