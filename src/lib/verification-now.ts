import 'server-only';

/** Request-scoped clock value for deterministic queue calculation during one server render. */
export async function verificationNow() {
  return Date.now();
}
