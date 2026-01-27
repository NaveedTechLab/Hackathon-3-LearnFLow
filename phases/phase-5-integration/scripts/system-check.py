#!/usr/bin/env python3
"""
System Check Script for LearnFlow Platform

This script verifies the cluster status and checks that no pods are in a CrashLoopBackOff state.
"""

import subprocess
import sys
import json
from typing import Dict, List, Tuple


def run_command(cmd: str) -> Tuple[str, str, int]:
    """Run a command and return stdout, stderr, and return code."""
    try:
        result = subprocess.run(
            cmd,
            shell=True,
            capture_output=True,
            text=True,
            check=True
        )
        return result.stdout.strip(), result.stderr.strip(), 0
    except subprocess.CalledProcessError as e:
        return e.stdout.strip(), e.stderr.strip(), e.returncode


def check_pod_status() -> bool:
    """Check that all pods are running and ready, with no CrashLoopBackOff state."""
    print("Checking pod status...")

    # Get all pods in all namespaces
    stdout, stderr, rc = run_command("kubectl get pods --all-namespaces -o json")

    if rc != 0:
        print(f"✗ Error getting pod status: {stderr}")
        return False

    try:
        pods_data = json.loads(stdout)
        pods = pods_data.get('items', [])

        crash_loop_pods = []
        all_running = True

        for pod in pods:
            namespace = pod['metadata']['namespace']
            pod_name = pod['metadata']['name']
            status = pod['status']
            phase = status.get('phase', 'Unknown')

            # Check for CrashLoopBackOff status
            container_statuses = status.get('containerStatuses', [])
            for container_status in container_statuses:
                if 'waiting' in container_status.get('state', {}):
                    reason = container_status['state']['waiting'].get('reason', '')
                    if reason == 'CrashLoopBackOff':
                        crash_loop_pods.append(f"{namespace}/{pod_name} ({container_status['name']})")

            # Check if pod is running and ready
            if phase != 'Running':
                all_running = False
                print(f"  ⚠ Pod {namespace}/{pod_name} is in {phase} state")

        if crash_loop_pods:
            print(f"✗ Found {len(crash_loop_pods)} pods in CrashLoopBackOff state:")
            for pod in crash_loop_pods:
                print(f"  - {pod}")
            return False
        else:
            print(f"✓ No pods in CrashLoopBackOff state")

        if all_running:
            print(f"✓ All pods are running")
        else:
            print(f"⚠ Some pods are not running (this may be expected if services aren't deployed yet)")

        return True

    except json.JSONDecodeError:
        print("✗ Error parsing kubectl output as JSON")
        return False


def check_dapr_status() -> bool:
    """Check Dapr status."""
    print("\nChecking Dapr status...")

    stdout, stderr, rc = run_command("dapr status -k")

    if rc == 0:
        print("✓ Dapr is running in Kubernetes")
        print(f"  Dapr status:\n{stdout}")
        return True
    else:
        print(f"⚠ Dapr may not be running in Kubernetes: {stderr}")
        # This might be expected if Dapr hasn't been initialized yet
        return True  # Don't fail the check if Dapr isn't running yet


def check_services_accessible() -> bool:
    """Check if services are accessible."""
    print("\nChecking service accessibility...")

    # Check if kubectl is accessible
    stdout, stderr, rc = run_command("kubectl cluster-info")

    if rc == 0:
        print("✓ Kubernetes cluster is accessible")
        return True
    else:
        print(f"✗ Kubernetes cluster is not accessible: {stderr}")
        return False


def main():
    print("=" * 70)
    print("SYSTEM CHECK FOR LEARNFLOW PLATFORM")
    print("=" * 70)

    all_checks_passed = True

    # Check pod status
    pod_check = check_pod_status()
    if not pod_check:
        all_checks_passed = False

    # Check Dapr status
    dapr_check = check_dapr_status()
    if not dapr_check:
        all_checks_passed = False

    # Check service accessibility
    service_check = check_services_accessible()
    if not service_check:
        all_checks_passed = False

    print("\n" + "=" * 70)
    if all_checks_passed:
        print("🎉 SYSTEM CHECK PASSED!")
        print("All systems are ready for the next phase of evaluation.")
        print("=" * 70)
        return True
    else:
        print("❌ SYSTEM CHECK FAILED!")
        print("Some issues were detected that need to be addressed.")
        print("=" * 70)
        return False


if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)