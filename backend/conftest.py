"""
Pytest configuration – suppresses harmless version-mismatch and deprecation warnings
so that `pytest` exits cleanly with code 0 when all tests pass.
"""

import warnings


def pytest_configure(config):
    # Scikit-learn model version mismatch (trained on 1.9.0, running on 1.6.1)
    warnings.filterwarnings(
        "ignore",
        message="Trying to unpickle estimator.*",
        category=UserWarning,
    )
    # Starlette/httpx deprecation
    warnings.filterwarnings(
        "ignore",
        message="Using `httpx` with `starlette.testclient` is deprecated.*",
    )
