import 'server-only';
import { reviewedCatalog, developmentCall } from './catalog';
export async function getOpportunities() {
  return process.env.COMICREADY_ENABLE_DEV_FIXTURES === 'true' ? [...reviewedCatalog, developmentCall] : reviewedCatalog;
}
export async function getOpportunity(slug: string) {
  return (await getOpportunities()).find(call => call.slug === slug && call.published);
}
