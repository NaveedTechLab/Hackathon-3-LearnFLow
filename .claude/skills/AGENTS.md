# AGENTS.md - Repository Guide for AI Agents

This document describes the structure, conventions, and guidelines for this repository to help AI agents understand and work with the codebase effectively.

## Repository Overview

This repository contains `.js`, `.py`, `.ts` code and follows standard conventions for AI agent development.

## Directory Structure

```
learnflow-app/
learnflow-app/frontend/
learnflow-app/frontend/app/
learnflow-app/frontend/app/about/
learnflow-app/frontend/app/contact/
learnflow-app/frontend/app/courses/
learnflow-app/frontend/app/register/
learnflow-app/frontend/app/resources/
learnflow-app/frontend/app/student/chat/
learnflow-app/frontend/app/student/dashboard/
learnflow-app/frontend/app/student/learn/
learnflow-app/frontend/app/student/progress/
learnflow-app/frontend/app/student/quiz/
learnflow-app/frontend/app/teacher/dashboard/
learnflow-app/frontend/lib/
learnflow-app/phase-1-foundation/
learnflow-app/services/api-gateway/
learnflow-app/services/api-gateway/app/
learnflow-app/services/code-review-agent/
learnflow-app/services/code-review-agent/app/
learnflow-app/services/concepts-agent/
learnflow-app/services/concepts-agent/app/
learnflow-app/services/debug-agent/
learnflow-app/services/debug-agent/app/
learnflow-app/services/exercise-agent/
learnflow-app/services/exercise-agent/app/
learnflow-app/services/progress-agent/
learnflow-app/services/progress-agent/app/
learnflow-app/services/triage-agent/
learnflow-app/services/triage-agent/app/
learnflow-app/venv/
learnflow-app/venv/Scripts/
learnflow-app/venv/bin/
learnflow-app/venv/lib/python3.12/site-packages/
learnflow-app/venv/lib/python3.12/site-packages/_yaml/
learnflow-app/venv/lib/python3.12/site-packages/annotated_doc/
learnflow-app/venv/lib/python3.12/site-packages/annotated_doc-0.0.4.dist-info/
learnflow-app/venv/lib/python3.12/site-packages/annotated_doc-0.0.4.dist-info/licenses/
learnflow-app/venv/lib/python3.12/site-packages/annotated_types/
learnflow-app/venv/lib/python3.12/site-packages/annotated_types-0.7.0.dist-info/
learnflow-app/venv/lib/python3.12/site-packages/annotated_types-0.7.0.dist-info/licenses/
learnflow-app/venv/lib/python3.12/site-packages/anyio/
learnflow-app/venv/lib/python3.12/site-packages/anyio-4.12.1.dist-info/
learnflow-app/venv/lib/python3.12/site-packages/anyio-4.12.1.dist-info/licenses/
learnflow-app/venv/lib/python3.12/site-packages/anyio/_backends/
learnflow-app/venv/lib/python3.12/site-packages/anyio/_core/
learnflow-app/venv/lib/python3.12/site-packages/anyio/abc/
learnflow-app/venv/lib/python3.12/site-packages/anyio/streams/
learnflow-app/venv/lib/python3.12/site-packages/certifi/
learnflow-app/venv/lib/python3.12/site-packages/certifi-2026.1.4.dist-info/
learnflow-app/venv/lib/python3.12/site-packages/certifi-2026.1.4.dist-info/licenses/
learnflow-app/venv/lib/python3.12/site-packages/click/
learnflow-app/venv/lib/python3.12/site-packages/click-8.3.1.dist-info/
learnflow-app/venv/lib/python3.12/site-packages/click-8.3.1.dist-info/licenses/
learnflow-app/venv/lib/python3.12/site-packages/distro/
learnflow-app/venv/lib/python3.12/site-packages/distro-1.9.0.dist-info/
learnflow-app/venv/lib/python3.12/site-packages/docstring_parser/
learnflow-app/venv/lib/python3.12/site-packages/docstring_parser-0.17.0.dist-info/
learnflow-app/venv/lib/python3.12/site-packages/docstring_parser-0.17.0.dist-info/licenses/
learnflow-app/venv/lib/python3.12/site-packages/docstring_parser/tests/
learnflow-app/venv/lib/python3.12/site-packages/dotenv/
learnflow-app/venv/lib/python3.12/site-packages/fastapi/
learnflow-app/venv/lib/python3.12/site-packages/fastapi-0.128.0.dist-info/
learnflow-app/venv/lib/python3.12/site-packages/fastapi-0.128.0.dist-info/licenses/
learnflow-app/venv/lib/python3.12/site-packages/fastapi/_compat/
learnflow-app/venv/lib/python3.12/site-packages/fastapi/dependencies/
learnflow-app/venv/lib/python3.12/site-packages/fastapi/middleware/
learnflow-app/venv/lib/python3.12/site-packages/fastapi/openapi/
learnflow-app/venv/lib/python3.12/site-packages/fastapi/security/
learnflow-app/venv/lib/python3.12/site-packages/h11/
learnflow-app/venv/lib/python3.12/site-packages/h11-0.16.0.dist-info/
learnflow-app/venv/lib/python3.12/site-packages/h11-0.16.0.dist-info/licenses/
learnflow-app/venv/lib/python3.12/site-packages/httpcore/
learnflow-app/venv/lib/python3.12/site-packages/httpcore-1.0.9.dist-info/
learnflow-app/venv/lib/python3.12/site-packages/httpcore-1.0.9.dist-info/licenses/
learnflow-app/venv/lib/python3.12/site-packages/httpcore/_async/
learnflow-app/venv/lib/python3.12/site-packages/httpcore/_backends/
learnflow-app/venv/lib/python3.12/site-packages/httpcore/_sync/
learnflow-app/venv/lib/python3.12/site-packages/httptools/
learnflow-app/venv/lib/python3.12/site-packages/httptools-0.7.1.dist-info/
learnflow-app/venv/lib/python3.12/site-packages/httptools-0.7.1.dist-info/licenses/
learnflow-app/venv/lib/python3.12/site-packages/httptools/parser/
learnflow-app/venv/lib/python3.12/site-packages/httpx/
learnflow-app/venv/lib/python3.12/site-packages/httpx-0.28.1.dist-info/
learnflow-app/venv/lib/python3.12/site-packages/httpx-0.28.1.dist-info/licenses/
learnflow-app/venv/lib/python3.12/site-packages/httpx/_transports/
learnflow-app/venv/lib/python3.12/site-packages/idna/
learnflow-app/venv/lib/python3.12/site-packages/idna-3.11.dist-info/
learnflow-app/venv/lib/python3.12/site-packages/idna-3.11.dist-info/licenses/
learnflow-app/venv/lib/python3.12/site-packages/jiter/
learnflow-app/venv/lib/python3.12/site-packages/jiter-0.12.0.dist-info/
learnflow-app/venv/lib/python3.12/site-packages/jiter-0.12.0.dist-info/licenses/
learnflow-app/venv/lib/python3.12/site-packages/openai/
learnflow-app/venv/lib/python3.12/site-packages/openai-2.15.0.dist-info/
learnflow-app/venv/lib/python3.12/site-packages/openai-2.15.0.dist-info/licenses/
learnflow-app/venv/lib/python3.12/site-packages/openai/_extras/
learnflow-app/venv/lib/python3.12/site-packages/openai/_utils/
learnflow-app/venv/lib/python3.12/site-packages/openai/cli/
learnflow-app/venv/lib/python3.12/site-packages/openai/cli/_api/
learnflow-app/venv/lib/python3.12/site-packages/openai/cli/_api/chat/
learnflow-app/venv/lib/python3.12/site-packages/openai/cli/_api/fine_tuning/
learnflow-app/venv/lib/python3.12/site-packages/openai/cli/_tools/
learnflow-app/venv/lib/python3.12/site-packages/openai/helpers/
learnflow-app/venv/lib/python3.12/site-packages/openai/lib/
learnflow-app/venv/lib/python3.12/site-packages/openai/lib/_parsing/
learnflow-app/venv/lib/python3.12/site-packages/openai/lib/streaming/
learnflow-app/venv/lib/python3.12/site-packages/openai/lib/streaming/chat/
learnflow-app/venv/lib/python3.12/site-packages/openai/lib/streaming/responses/
learnflow-app/venv/lib/python3.12/site-packages/openai/resources/
learnflow-app/venv/lib/python3.12/site-packages/openai/resources/audio/
learnflow-app/venv/lib/python3.12/site-packages/openai/resources/beta/
learnflow-app/venv/lib/python3.12/site-packages/openai/resources/beta/chatkit/
learnflow-app/venv/lib/python3.12/site-packages/openai/resources/beta/realtime/
learnflow-app/venv/lib/python3.12/site-packages/openai/resources/beta/threads/
learnflow-app/venv/lib/python3.12/site-packages/openai/resources/beta/threads/runs/
learnflow-app/venv/lib/python3.12/site-packages/openai/resources/chat/
learnflow-app/venv/lib/python3.12/site-packages/openai/resources/chat/completions/
learnflow-app/venv/lib/python3.12/site-packages/openai/resources/containers/
learnflow-app/venv/lib/python3.12/site-packages/openai/resources/containers/files/
learnflow-app/venv/lib/python3.12/site-packages/openai/resources/conversations/
learnflow-app/venv/lib/python3.12/site-packages/openai/resources/evals/
learnflow-app/venv/lib/python3.12/site-packages/openai/resources/evals/runs/
learnflow-app/venv/lib/python3.12/site-packages/openai/resources/fine_tuning/
learnflow-app/venv/lib/python3.12/site-packages/openai/resources/fine_tuning/alpha/
learnflow-app/venv/lib/python3.12/site-packages/openai/resources/fine_tuning/checkpoints/
learnflow-app/venv/lib/python3.12/site-packages/openai/resources/fine_tuning/jobs/
learnflow-app/venv/lib/python3.12/site-packages/openai/resources/realtime/
learnflow-app/venv/lib/python3.12/site-packages/openai/resources/responses/
learnflow-app/venv/lib/python3.12/site-packages/openai/resources/uploads/
learnflow-app/venv/lib/python3.12/site-packages/openai/resources/vector_stores/
learnflow-app/venv/lib/python3.12/site-packages/openai/types/
learnflow-app/venv/lib/python3.12/site-packages/openai/types/audio/
learnflow-app/venv/lib/python3.12/site-packages/openai/types/beta/
learnflow-app/venv/lib/python3.12/site-packages/openai/types/beta/chat/
learnflow-app/venv/lib/python3.12/site-packages/openai/types/beta/chatkit/
learnflow-app/venv/lib/python3.12/site-packages/openai/types/beta/realtime/
learnflow-app/venv/lib/python3.12/site-packages/openai/types/beta/threads/
learnflow-app/venv/lib/python3.12/site-packages/openai/types/beta/threads/runs/
learnflow-app/venv/lib/python3.12/site-packages/openai/types/chat/
learnflow-app/venv/lib/python3.12/site-packages/openai/types/chat/completions/
learnflow-app/venv/lib/python3.12/site-packages/openai/types/containers/
learnflow-app/venv/lib/python3.12/site-packages/openai/types/containers/files/
learnflow-app/venv/lib/python3.12/site-packages/openai/types/conversations/
learnflow-app/venv/lib/python3.12/site-packages/openai/types/evals/
learnflow-app/venv/lib/python3.12/site-packages/openai/types/evals/runs/
learnflow-app/venv/lib/python3.12/site-packages/openai/types/fine_tuning/
learnflow-app/venv/lib/python3.12/site-packages/openai/types/fine_tuning/alpha/
learnflow-app/venv/lib/python3.12/site-packages/openai/types/fine_tuning/checkpoints/
learnflow-app/venv/lib/python3.12/site-packages/openai/types/fine_tuning/jobs/
learnflow-app/venv/lib/python3.12/site-packages/openai/types/graders/
learnflow-app/venv/lib/python3.12/site-packages/openai/types/realtime/
learnflow-app/venv/lib/python3.12/site-packages/openai/types/responses/
learnflow-app/venv/lib/python3.12/site-packages/openai/types/shared/
learnflow-app/venv/lib/python3.12/site-packages/openai/types/shared_params/
learnflow-app/venv/lib/python3.12/site-packages/openai/types/uploads/
learnflow-app/venv/lib/python3.12/site-packages/openai/types/vector_stores/
learnflow-app/venv/lib/python3.12/site-packages/openai/types/webhooks/
learnflow-app/venv/lib/python3.12/site-packages/pip/
learnflow-app/venv/lib/python3.12/site-packages/pip-24.0.dist-info/
learnflow-app/venv/lib/python3.12/site-packages/pip/_internal/
learnflow-app/venv/lib/python3.12/site-packages/pip/_internal/cli/
learnflow-app/venv/lib/python3.12/site-packages/pip/_internal/commands/
learnflow-app/venv/lib/python3.12/site-packages/pip/_internal/distributions/
learnflow-app/venv/lib/python3.12/site-packages/pip/_internal/index/
learnflow-app/venv/lib/python3.12/site-packages/pip/_internal/locations/
learnflow-app/venv/lib/python3.12/site-packages/pip/_internal/metadata/
learnflow-app/venv/lib/python3.12/site-packages/pip/_internal/metadata/importlib/
learnflow-app/venv/lib/python3.12/site-packages/pip/_internal/models/
learnflow-app/venv/lib/python3.12/site-packages/pip/_internal/network/
learnflow-app/venv/lib/python3.12/site-packages/pip/_internal/operations/
learnflow-app/venv/lib/python3.12/site-packages/pip/_internal/operations/build/
learnflow-app/venv/lib/python3.12/site-packages/pip/_internal/operations/install/
learnflow-app/venv/lib/python3.12/site-packages/pip/_internal/req/
learnflow-app/venv/lib/python3.12/site-packages/pip/_internal/resolution/
learnflow-app/venv/lib/python3.12/site-packages/pip/_internal/resolution/legacy/
learnflow-app/venv/lib/python3.12/site-packages/pip/_internal/resolution/resolvelib/
learnflow-app/venv/lib/python3.12/site-packages/pip/_internal/utils/
learnflow-app/venv/lib/python3.12/site-packages/pip/_internal/vcs/
learnflow-app/venv/lib/python3.12/site-packages/pip/_vendor/
learnflow-app/venv/lib/python3.12/site-packages/pip/_vendor/cachecontrol/
learnflow-app/venv/lib/python3.12/site-packages/pip/_vendor/cachecontrol/caches/
learnflow-app/venv/lib/python3.12/site-packages/pip/_vendor/certifi/
learnflow-app/venv/lib/python3.12/site-packages/pip/_vendor/chardet/
learnflow-app/venv/lib/python3.12/site-packages/pip/_vendor/chardet/cli/
learnflow-app/venv/lib/python3.12/site-packages/pip/_vendor/chardet/metadata/
learnflow-app/venv/lib/python3.12/site-packages/pip/_vendor/colorama/
learnflow-app/venv/lib/python3.12/site-packages/pip/_vendor/colorama/tests/
learnflow-app/venv/lib/python3.12/site-packages/pip/_vendor/distlib/
learnflow-app/venv/lib/python3.12/site-packages/pip/_vendor/distro/
learnflow-app/venv/lib/python3.12/site-packages/pip/_vendor/idna/
learnflow-app/venv/lib/python3.12/site-packages/pip/_vendor/msgpack/
learnflow-app/venv/lib/python3.12/site-packages/pip/_vendor/packaging/
learnflow-app/venv/lib/python3.12/site-packages/pip/_vendor/pkg_resources/
learnflow-app/venv/lib/python3.12/site-packages/pip/_vendor/platformdirs/
learnflow-app/venv/lib/python3.12/site-packages/pip/_vendor/pygments/
learnflow-app/venv/lib/python3.12/site-packages/pip/_vendor/pygments/filters/
learnflow-app/venv/lib/python3.12/site-packages/pip/_vendor/pygments/formatters/
learnflow-app/venv/lib/python3.12/site-packages/pip/_vendor/pygments/lexers/
learnflow-app/venv/lib/python3.12/site-packages/pip/_vendor/pygments/styles/
learnflow-app/venv/lib/python3.12/site-packages/pip/_vendor/pyparsing/
learnflow-app/venv/lib/python3.12/site-packages/pip/_vendor/pyparsing/diagram/
learnflow-app/venv/lib/python3.12/site-packages/pip/_vendor/pyproject_hooks/
learnflow-app/venv/lib/python3.12/site-packages/pip/_vendor/pyproject_hooks/_in_process/
learnflow-app/venv/lib/python3.12/site-packages/pip/_vendor/requests/
learnflow-app/venv/lib/python3.12/site-packages/pip/_vendor/resolvelib/
learnflow-app/venv/lib/python3.12/site-packages/pip/_vendor/resolvelib/compat/
learnflow-app/venv/lib/python3.12/site-packages/pip/_vendor/rich/
learnflow-app/venv/lib/python3.12/site-packages/pip/_vendor/tenacity/
learnflow-app/venv/lib/python3.12/site-packages/pip/_vendor/tomli/
learnflow-app/venv/lib/python3.12/site-packages/pip/_vendor/truststore/
learnflow-app/venv/lib/python3.12/site-packages/pip/_vendor/urllib3/
learnflow-app/venv/lib/python3.12/site-packages/pip/_vendor/urllib3/contrib/
learnflow-app/venv/lib/python3.12/site-packages/pip/_vendor/urllib3/contrib/_securetransport/
learnflow-app/venv/lib/python3.12/site-packages/pip/_vendor/urllib3/packages/
learnflow-app/venv/lib/python3.12/site-packages/pip/_vendor/urllib3/packages/backports/
learnflow-app/venv/lib/python3.12/site-packages/pip/_vendor/urllib3/util/
learnflow-app/venv/lib/python3.12/site-packages/pip/_vendor/webencodings/
learnflow-app/venv/lib/python3.12/site-packages/pydantic/
learnflow-app/venv/lib/python3.12/site-packages/pydantic-2.12.5.dist-info/
learnflow-app/venv/lib/python3.12/site-packages/pydantic-2.12.5.dist-info/licenses/
learnflow-app/venv/lib/python3.12/site-packages/pydantic/_internal/
learnflow-app/venv/lib/python3.12/site-packages/pydantic/deprecated/
learnflow-app/venv/lib/python3.12/site-packages/pydantic/experimental/
learnflow-app/venv/lib/python3.12/site-packages/pydantic/plugin/
learnflow-app/venv/lib/python3.12/site-packages/pydantic/v1/
learnflow-app/venv/lib/python3.12/site-packages/pydantic_core/
learnflow-app/venv/lib/python3.12/site-packages/pydantic_core-2.41.5.dist-info/
learnflow-app/venv/lib/python3.12/site-packages/pydantic_core-2.41.5.dist-info/licenses/
learnflow-app/venv/lib/python3.12/site-packages/python_dotenv-1.2.1.dist-info/
learnflow-app/venv/lib/python3.12/site-packages/python_dotenv-1.2.1.dist-info/licenses/
learnflow-app/venv/lib/python3.12/site-packages/pyyaml-6.0.3.dist-info/
learnflow-app/venv/lib/python3.12/site-packages/pyyaml-6.0.3.dist-info/licenses/
learnflow-app/venv/lib/python3.12/site-packages/sniffio/
learnflow-app/venv/lib/python3.12/site-packages/sniffio-1.3.1.dist-info/
learnflow-app/venv/lib/python3.12/site-packages/sniffio/_tests/
learnflow-app/venv/lib/python3.12/site-packages/starlette/
learnflow-app/venv/lib/python3.12/site-packages/starlette-0.50.0.dist-info/
learnflow-app/venv/lib/python3.12/site-packages/starlette-0.50.0.dist-info/licenses/
learnflow-app/venv/lib/python3.12/site-packages/starlette/middleware/
learnflow-app/venv/lib/python3.12/site-packages/tqdm/
learnflow-app/venv/lib/python3.12/site-packages/tqdm-4.67.1.dist-info/
learnflow-app/venv/lib/python3.12/site-packages/tqdm/contrib/
learnflow-app/venv/lib/python3.12/site-packages/typing_extensions-4.15.0.dist-info/
learnflow-app/venv/lib/python3.12/site-packages/typing_extensions-4.15.0.dist-info/licenses/
learnflow-app/venv/lib/python3.12/site-packages/typing_inspection/
learnflow-app/venv/lib/python3.12/site-packages/typing_inspection-0.4.2.dist-info/
learnflow-app/venv/lib/python3.12/site-packages/typing_inspection-0.4.2.dist-info/licenses/
learnflow-app/venv/lib/python3.12/site-packages/uvicorn/
learnflow-app/venv/lib/python3.12/site-packages/uvicorn-0.40.0.dist-info/
learnflow-app/venv/lib/python3.12/site-packages/uvicorn-0.40.0.dist-info/licenses/
learnflow-app/venv/lib/python3.12/site-packages/uvicorn/lifespan/
learnflow-app/venv/lib/python3.12/site-packages/uvicorn/loops/
learnflow-app/venv/lib/python3.12/site-packages/uvicorn/middleware/
learnflow-app/venv/lib/python3.12/site-packages/uvicorn/protocols/
learnflow-app/venv/lib/python3.12/site-packages/uvicorn/protocols/http/
learnflow-app/venv/lib/python3.12/site-packages/uvicorn/protocols/websockets/
learnflow-app/venv/lib/python3.12/site-packages/uvicorn/supervisors/
learnflow-app/venv/lib/python3.12/site-packages/uvloop/
learnflow-app/venv/lib/python3.12/site-packages/uvloop-0.22.1.dist-info/
learnflow-app/venv/lib/python3.12/site-packages/uvloop-0.22.1.dist-info/licenses/
learnflow-app/venv/lib/python3.12/site-packages/uvloop/handles/
learnflow-app/venv/lib/python3.12/site-packages/uvloop/includes/
learnflow-app/venv/lib/python3.12/site-packages/watchfiles/
learnflow-app/venv/lib/python3.12/site-packages/watchfiles-1.1.1.dist-info/
learnflow-app/venv/lib/python3.12/site-packages/watchfiles-1.1.1.dist-info/licenses/
learnflow-app/venv/lib/python3.12/site-packages/websockets/
learnflow-app/venv/lib/python3.12/site-packages/websockets-16.0.dist-info/
learnflow-app/venv/lib/python3.12/site-packages/websockets-16.0.dist-info/licenses/
learnflow-app/venv/lib/python3.12/site-packages/websockets/asyncio/
learnflow-app/venv/lib/python3.12/site-packages/websockets/extensions/
learnflow-app/venv/lib/python3.12/site-packages/websockets/legacy/
learnflow-app/venv/lib/python3.12/site-packages/websockets/sync/
learnflow-app/venv/lib/python3.12/site-packages/yaml/
learnflow-app/venv/lib/site-packages/
learnflow-app/venv/lib/site-packages/PyJWT-2.10.1.dist-info/
learnflow-app/venv/lib/site-packages/annotated_doc/
learnflow-app/venv/lib/site-packages/annotated_doc-0.0.4.dist-info/
learnflow-app/venv/lib/site-packages/annotated_doc-0.0.4.dist-info/licenses/
learnflow-app/venv/lib/site-packages/annotated_types/
learnflow-app/venv/lib/site-packages/annotated_types-0.7.0.dist-info/
learnflow-app/venv/lib/site-packages/annotated_types-0.7.0.dist-info/licenses/
learnflow-app/venv/lib/site-packages/anyio/
learnflow-app/venv/lib/site-packages/anyio-4.12.1.dist-info/
learnflow-app/venv/lib/site-packages/anyio-4.12.1.dist-info/licenses/
learnflow-app/venv/lib/site-packages/anyio/_backends/
learnflow-app/venv/lib/site-packages/anyio/_core/
learnflow-app/venv/lib/site-packages/anyio/abc/
learnflow-app/venv/lib/site-packages/anyio/streams/
learnflow-app/venv/lib/site-packages/certifi/
learnflow-app/venv/lib/site-packages/certifi-2026.1.4.dist-info/
learnflow-app/venv/lib/site-packages/certifi-2026.1.4.dist-info/licenses/
learnflow-app/venv/lib/site-packages/click/
learnflow-app/venv/lib/site-packages/click-8.3.1.dist-info/
learnflow-app/venv/lib/site-packages/click-8.3.1.dist-info/licenses/
learnflow-app/venv/lib/site-packages/colorama/
learnflow-app/venv/lib/site-packages/colorama-0.4.6.dist-info/
learnflow-app/venv/lib/site-packages/colorama-0.4.6.dist-info/licenses/
learnflow-app/venv/lib/site-packages/colorama/tests/
learnflow-app/venv/lib/site-packages/dotenv/
learnflow-app/venv/lib/site-packages/ecdsa/
learnflow-app/venv/lib/site-packages/ecdsa-0.19.1.dist-info/
learnflow-app/venv/lib/site-packages/fastapi/
learnflow-app/venv/lib/site-packages/fastapi-0.128.0.dist-info/
learnflow-app/venv/lib/site-packages/fastapi-0.128.0.dist-info/licenses/
learnflow-app/venv/lib/site-packages/fastapi/_compat/
learnflow-app/venv/lib/site-packages/fastapi/dependencies/
learnflow-app/venv/lib/site-packages/fastapi/middleware/
learnflow-app/venv/lib/site-packages/fastapi/openapi/
learnflow-app/venv/lib/site-packages/fastapi/security/
learnflow-app/venv/lib/site-packages/h11/
learnflow-app/venv/lib/site-packages/h11-0.16.0.dist-info/
learnflow-app/venv/lib/site-packages/h11-0.16.0.dist-info/licenses/
learnflow-app/venv/lib/site-packages/httpcore/
learnflow-app/venv/lib/site-packages/httpcore-1.0.9.dist-info/
learnflow-app/venv/lib/site-packages/httpcore-1.0.9.dist-info/licenses/
learnflow-app/venv/lib/site-packages/httpcore/_async/
learnflow-app/venv/lib/site-packages/httpcore/_backends/
learnflow-app/venv/lib/site-packages/httpcore/_sync/
learnflow-app/venv/lib/site-packages/httpx/
learnflow-app/venv/lib/site-packages/httpx-0.28.1.dist-info/
learnflow-app/venv/lib/site-packages/httpx-0.28.1.dist-info/licenses/
learnflow-app/venv/lib/site-packages/httpx/_transports/
learnflow-app/venv/lib/site-packages/idna/
learnflow-app/venv/lib/site-packages/idna-3.11.dist-info/
learnflow-app/venv/lib/site-packages/idna-3.11.dist-info/licenses/
learnflow-app/venv/lib/site-packages/jose/
learnflow-app/venv/lib/site-packages/jose/backends/
learnflow-app/venv/lib/site-packages/jwt/
learnflow-app/venv/lib/site-packages/multipart/
learnflow-app/venv/lib/site-packages/pip/
learnflow-app/venv/lib/site-packages/pip-25.2.dist-info/
learnflow-app/venv/lib/site-packages/pip-25.2.dist-info/licenses/
learnflow-app/venv/lib/site-packages/pip-25.2.dist-info/licenses/src/pip/_vendor/cachecontrol/
learnflow-app/venv/lib/site-packages/pip-25.2.dist-info/licenses/src/pip/_vendor/certifi/
learnflow-app/venv/lib/site-packages/pip-25.2.dist-info/licenses/src/pip/_vendor/dependency_groups/
learnflow-app/venv/lib/site-packages/pip-25.2.dist-info/licenses/src/pip/_vendor/distlib/
learnflow-app/venv/lib/site-packages/pip-25.2.dist-info/licenses/src/pip/_vendor/distro/
learnflow-app/venv/lib/site-packages/pip-25.2.dist-info/licenses/src/pip/_vendor/idna/
learnflow-app/venv/lib/site-packages/pip-25.2.dist-info/licenses/src/pip/_vendor/msgpack/
learnflow-app/venv/lib/site-packages/pip-25.2.dist-info/licenses/src/pip/_vendor/packaging/
learnflow-app/venv/lib/site-packages/pip-25.2.dist-info/licenses/src/pip/_vendor/pkg_resources/
learnflow-app/venv/lib/site-packages/pip-25.2.dist-info/licenses/src/pip/_vendor/platformdirs/
learnflow-app/venv/lib/site-packages/pip-25.2.dist-info/licenses/src/pip/_vendor/pygments/
learnflow-app/venv/lib/site-packages/pip-25.2.dist-info/licenses/src/pip/_vendor/pyproject_hooks/
learnflow-app/venv/lib/site-packages/pip-25.2.dist-info/licenses/src/pip/_vendor/requests/
learnflow-app/venv/lib/site-packages/pip-25.2.dist-info/licenses/src/pip/_vendor/resolvelib/
learnflow-app/venv/lib/site-packages/pip-25.2.dist-info/licenses/src/pip/_vendor/rich/
learnflow-app/venv/lib/site-packages/pip-25.2.dist-info/licenses/src/pip/_vendor/tomli/
learnflow-app/venv/lib/site-packages/pip-25.2.dist-info/licenses/src/pip/_vendor/tomli_w/
learnflow-app/venv/lib/site-packages/pip-25.2.dist-info/licenses/src/pip/_vendor/truststore/
learnflow-app/venv/lib/site-packages/pip-25.2.dist-info/licenses/src/pip/_vendor/urllib3/
learnflow-app/venv/lib/site-packages/pip/_internal/
learnflow-app/venv/lib/site-packages/pip/_internal/cli/
learnflow-app/venv/lib/site-packages/pip/_internal/commands/
learnflow-app/venv/lib/site-packages/pip/_internal/distributions/
learnflow-app/venv/lib/site-packages/pip/_internal/index/
learnflow-app/venv/lib/site-packages/pip/_internal/locations/
learnflow-app/venv/lib/site-packages/pip/_internal/metadata/
learnflow-app/venv/lib/site-packages/pip/_internal/metadata/importlib/
learnflow-app/venv/lib/site-packages/pip/_internal/models/
learnflow-app/venv/lib/site-packages/pip/_internal/network/
learnflow-app/venv/lib/site-packages/pip/_internal/operations/
learnflow-app/venv/lib/site-packages/pip/_internal/operations/build/
learnflow-app/venv/lib/site-packages/pip/_internal/operations/install/
learnflow-app/venv/lib/site-packages/pip/_internal/req/
learnflow-app/venv/lib/site-packages/pip/_internal/resolution/
learnflow-app/venv/lib/site-packages/pip/_internal/resolution/legacy/
learnflow-app/venv/lib/site-packages/pip/_internal/resolution/resolvelib/
learnflow-app/venv/lib/site-packages/pip/_internal/utils/
learnflow-app/venv/lib/site-packages/pip/_internal/vcs/
learnflow-app/venv/lib/site-packages/pip/_vendor/
learnflow-app/venv/lib/site-packages/pip/_vendor/cachecontrol/
learnflow-app/venv/lib/site-packages/pip/_vendor/cachecontrol/caches/
learnflow-app/venv/lib/site-packages/pip/_vendor/certifi/
learnflow-app/venv/lib/site-packages/pip/_vendor/dependency_groups/
learnflow-app/venv/lib/site-packages/pip/_vendor/distlib/
learnflow-app/venv/lib/site-packages/pip/_vendor/distro/
learnflow-app/venv/lib/site-packages/pip/_vendor/idna/
learnflow-app/venv/lib/site-packages/pip/_vendor/msgpack/
learnflow-app/venv/lib/site-packages/pip/_vendor/packaging/
learnflow-app/venv/lib/site-packages/pip/_vendor/packaging/licenses/
learnflow-app/venv/lib/site-packages/pip/_vendor/pkg_resources/
learnflow-app/venv/lib/site-packages/pip/_vendor/platformdirs/
learnflow-app/venv/lib/site-packages/pip/_vendor/pygments/
learnflow-app/venv/lib/site-packages/pip/_vendor/pygments/filters/
learnflow-app/venv/lib/site-packages/pip/_vendor/pygments/formatters/
learnflow-app/venv/lib/site-packages/pip/_vendor/pygments/lexers/
learnflow-app/venv/lib/site-packages/pip/_vendor/pygments/styles/
learnflow-app/venv/lib/site-packages/pip/_vendor/pyproject_hooks/
learnflow-app/venv/lib/site-packages/pip/_vendor/pyproject_hooks/_in_process/
learnflow-app/venv/lib/site-packages/pip/_vendor/requests/
learnflow-app/venv/lib/site-packages/pip/_vendor/resolvelib/
learnflow-app/venv/lib/site-packages/pip/_vendor/resolvelib/resolvers/
learnflow-app/venv/lib/site-packages/pip/_vendor/rich/
learnflow-app/venv/lib/site-packages/pip/_vendor/tomli/
learnflow-app/venv/lib/site-packages/pip/_vendor/tomli_w/
learnflow-app/venv/lib/site-packages/pip/_vendor/truststore/
learnflow-app/venv/lib/site-packages/pip/_vendor/urllib3/
learnflow-app/venv/lib/site-packages/pip/_vendor/urllib3/contrib/
learnflow-app/venv/lib/site-packages/pip/_vendor/urllib3/contrib/_securetransport/
learnflow-app/venv/lib/site-packages/pip/_vendor/urllib3/packages/
learnflow-app/venv/lib/site-packages/pip/_vendor/urllib3/packages/backports/
learnflow-app/venv/lib/site-packages/pip/_vendor/urllib3/util/
learnflow-app/venv/lib/site-packages/pyasn1/
learnflow-app/venv/lib/site-packages/pyasn1-0.6.2.dist-info/
learnflow-app/venv/lib/site-packages/pyasn1-0.6.2.dist-info/licenses/
learnflow-app/venv/lib/site-packages/pyasn1/codec/
learnflow-app/venv/lib/site-packages/pyasn1/codec/ber/
learnflow-app/venv/lib/site-packages/pyasn1/codec/cer/
learnflow-app/venv/lib/site-packages/pyasn1/codec/der/
learnflow-app/venv/lib/site-packages/pyasn1/codec/native/
learnflow-app/venv/lib/site-packages/pyasn1/compat/
learnflow-app/venv/lib/site-packages/pyasn1/type/
learnflow-app/venv/lib/site-packages/pydantic/
learnflow-app/venv/lib/site-packages/pydantic-2.12.5.dist-info/
learnflow-app/venv/lib/site-packages/pydantic-2.12.5.dist-info/licenses/
learnflow-app/venv/lib/site-packages/pydantic/_internal/
learnflow-app/venv/lib/site-packages/pydantic/deprecated/
learnflow-app/venv/lib/site-packages/pydantic/experimental/
learnflow-app/venv/lib/site-packages/pydantic/plugin/
learnflow-app/venv/lib/site-packages/pydantic/v1/
learnflow-app/venv/lib/site-packages/pydantic_core/
learnflow-app/venv/lib/site-packages/pydantic_core-2.41.5.dist-info/
learnflow-app/venv/lib/site-packages/pydantic_core-2.41.5.dist-info/licenses/
learnflow-app/venv/lib/site-packages/python_dotenv-1.2.1.dist-info/
learnflow-app/venv/lib/site-packages/python_dotenv-1.2.1.dist-info/licenses/
learnflow-app/venv/lib/site-packages/python_jose-3.5.0.dist-info/
learnflow-app/venv/lib/site-packages/python_jose-3.5.0.dist-info/licenses/
learnflow-app/venv/lib/site-packages/python_multipart/
learnflow-app/venv/lib/site-packages/python_multipart-0.0.21.dist-info/
learnflow-app/venv/lib/site-packages/python_multipart-0.0.21.dist-info/licenses/
learnflow-app/venv/lib/site-packages/rsa/
learnflow-app/venv/lib/site-packages/rsa-4.9.1.dist-info/
learnflow-app/venv/lib/site-packages/six-1.17.0.dist-info/
learnflow-app/venv/lib/site-packages/starlette/
learnflow-app/venv/lib/site-packages/starlette-0.50.0.dist-info/
learnflow-app/venv/lib/site-packages/starlette-0.50.0.dist-info/licenses/
learnflow-app/venv/lib/site-packages/starlette/middleware/
learnflow-app/venv/lib/site-packages/typing_extensions-4.15.0.dist-info/
learnflow-app/venv/lib/site-packages/typing_extensions-4.15.0.dist-info/licenses/
learnflow-app/venv/lib/site-packages/typing_inspection/
learnflow-app/venv/lib/site-packages/typing_inspection-0.4.2.dist-info/
learnflow-app/venv/lib/site-packages/typing_inspection-0.4.2.dist-info/licenses/
learnflow-app/venv/lib/site-packages/uvicorn/
learnflow-app/venv/lib/site-packages/uvicorn-0.40.0.dist-info/
learnflow-app/venv/lib/site-packages/uvicorn-0.40.0.dist-info/licenses/
learnflow-app/venv/lib/site-packages/uvicorn/lifespan/
learnflow-app/venv/lib/site-packages/uvicorn/loops/
learnflow-app/venv/lib/site-packages/uvicorn/middleware/
learnflow-app/venv/lib/site-packages/uvicorn/protocols/
learnflow-app/venv/lib/site-packages/uvicorn/protocols/http/
learnflow-app/venv/lib/site-packages/uvicorn/protocols/websockets/
learnflow-app/venv/lib/site-packages/uvicorn/supervisors/
specs/1-env-foundation/
specs/1-env-foundation/checklists/
specs/1-env-foundation/contracts/
```

## Key Files

- `learnflow-app/.dockerignore`
- `learnflow-app/.env`
- `learnflow-app/README.md`
- `learnflow-app/backend_tests.py`
- `learnflow-app/docker-compose.yml`
- `learnflow-app/frontend/.dockerignore`
- `learnflow-app/frontend/.env.local`
- `learnflow-app/frontend/Dockerfile`
- `learnflow-app/frontend/app/about/page.tsx`
- `learnflow-app/frontend/app/contact/page.tsx`
- ... and 3531 more important files

## Development Conventions

### Code Style
- Follow the established patterns in the existing codebase
- Maintain consistency with existing naming conventions
- Use descriptive variable and function names

### Testing
- Tests are located in test directories throughout the project
- Follow the existing test patterns when adding new functionality


### Documentation
- Document new functions, classes, and modules appropriately
- Update README.md if adding major new features

## Working with AI Agents

When working with AI agents in this repository:

1. Examine the existing code patterns before making changes
2. Follow the established architecture and design principles
3. Use consistent naming and coding styles
4. Ensure new code integrates well with existing functionality

## Getting Started

1. Review the README.md for initial setup instructions
2. Examine the directory structure and key files mentioned above
3. Look at existing agent configurations to understand the expected format
4. Follow the development conventions outlined in this document

## Additional Notes

Based on the repository analysis, AI agents should pay attention to the following:

- The repository structure suggests it may contain AI agent implementations
- Configuration files (if present) will define agent behavior and capabilities
- Follow the existing code patterns when extending functionality

