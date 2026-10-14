#!/usr/bin/env python3
"""Generate golden Sec-MS-GEC v2 vectors from the Python reference (edge-tts).

Usage (run isolated, from a venv with edge-tts >= 7.3.1 installed):

    python -I scripts/tts/gen-sec-ms-gec-vectors.py > lib/tts/sec-ms-gec.vectors.json

The reference's clock (DRM.get_unix_timestamp) is monkeypatched to each fixed
timestamp, and the token is taken from the public DRM.generate_sec_ms_gec(),
so the vectors cover the same path edge-tts itself uses on the wire.
"""

import json
import sys
from importlib.metadata import version

from edge_tts import constants
from edge_tts.drm import DRM

# Unix seconds: window boundaries, fractions, one tick before a boundary, the
# outage date, and dates far before/after it.
TIMESTAMPS = [
    0,
    1_000_000_000,
    1_700_000_000,
    1_760_000_000.5,
    1_791_936_000,  # 2026-10-14T00:00:00Z
    1_791_936_299.999,
    1_791_936_300,
    1_792_000_123.25,
    2_000_000_000,
    2_208_988_800,  # 2040-01-01T00:00:00Z
]


def main() -> None:
    vectors = []
    original = DRM.get_unix_timestamp
    try:
        for ts in TIMESTAMPS:
            DRM.get_unix_timestamp = staticmethod(lambda ts=ts: float(ts))
            vectors.append({"unixSeconds": ts, "token": DRM.generate_sec_ms_gec()})
    finally:
        DRM.get_unix_timestamp = original
    json.dump(
        {
            "generator": "scripts/tts/gen-sec-ms-gec-vectors.py",
            "reference": f"edge-tts {version('edge-tts')}",
            "secMsGecVersion": constants.SEC_MS_GEC_VERSION,
            "vectors": vectors,
        },
        sys.stdout,
        indent=2,
    )
    sys.stdout.write("\n")


if __name__ == "__main__":
    main()
