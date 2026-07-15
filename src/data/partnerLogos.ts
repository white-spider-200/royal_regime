export interface PartnerLogo {
  id: string;
  src: string;
  alt: string;
  altAr: string;
}

const base = '/assets/images/partners';

export const PARTNER_LOGOS: PartnerLogo[] = [
  { id: 'eda', src: `${base}/2026__04__egyptian-drug-authority.jpeg`, alt: 'Egyptian Drug Authority', altAr: 'هيئة الدواء المصرية' },
  { id: 'asta', src: `${base}/2026__04__ASTA_20424.jpg`, alt: 'American Spice Trade Association', altAr: 'جمعية التجارة الأمريكية للتوابل' },
  { id: 'canada-organic', src: `${base}/2026__04__canada-organic-logo-png_seeklogo-223201.png`, alt: 'Canada Organic', altAr: 'كندا العضوي' },
  { id: 'ceres', src: `${base}/2026__04__logo_CERES.png`, alt: 'CERES Certified', altAr: 'شهادة CERES' },
  { id: 'esa', src: `${base}/2026__04__ESA-spice.webp`, alt: 'European Spice Association', altAr: 'جمعية التوابل الأوروبية' },
  { id: 'eu-organic', src: `${base}/2026__04__csm_eu-logo_269c3dd5dd-e1777189450111.jpg`, alt: 'EU Organic', altAr: 'الاتحاد الأوروبي العضوي' },
  { id: 'fda', src: `${base}/2026__04__fda-logo.jpg`, alt: 'U.S. Food and Drug Administration', altAr: 'إدارة الغذاء والدواء الأمريكية' },
  { id: 'fssc', src: `${base}/2026__04__new-fssc-22000-logo-sito.png`, alt: 'FSSC 22000', altAr: 'FSSC 22000' },
  { id: 'gmp', src: `${base}/2026__04__Certified-GMP-Logo-PNG-Transparent-Image.png`, alt: 'GMP Certified', altAr: 'شهادة GMP' },
  { id: 'halal', src: `${base}/2026__04__index-2.png`, alt: 'Halal Certified', altAr: 'حلال معتمد' },
  { id: 'iso-14001', src: `${base}/2026__04__pngtree-iso-14001-certified-company-logo-badge-png-image_8540372.png`, alt: 'ISO 14001', altAr: 'ISO 14001' },
  { id: 'iso-22000', src: `${base}/2026__04__Konsultan-ISO-22000.png`, alt: 'ISO 22000', altAr: 'ISO 22000' },
  { id: 'iso-9001', src: `${base}/2026__04__iso-9001-2015-logo_logoshape.png`, alt: 'ISO 9001:2015', altAr: 'ISO 9001:2015' },
  { id: 'jas', src: `${base}/2026__04__f31e992b-5a58-4120-97d1-14b2d0e6ca85.__CR00300225_PT0_SX300_V1___.jpg`, alt: 'JAS Organic', altAr: 'JAS العضوي' },
  { id: 'kosher', src: `${base}/2026__04__1000_F_226534569_GtBMdkpIqQCtxJlFsh4GIRUORjmaL7OR.jpg`, alt: 'Certified Kosher', altAr: 'كوشر معتمد' },
  { id: 'mabagrown', src: `${base}/2026__04__Mabagrown.png`, alt: 'mabagrown', altAr: 'mabagrown' },
  { id: 'martin-bauer', src: `${base}/2026__04__MB_Logo_RGB-scaled.jpg`, alt: 'Martin Bauer Group', altAr: 'مجموعة مارتن باور' },
  { id: 'naturland', src: `${base}/2026__04__20231002161427922.jpg`, alt: 'Naturland', altAr: 'ناتورلاند' },
  { id: 'partner', src: `${base}/2026__04__logos.jpg`, alt: 'Partner', altAr: 'شريك' },
  { id: 'rainforest', src: `${base}/2026__04__rainforest-alliance-logo-png_seeklogo-493250.png`, alt: 'Rainforest Alliance', altAr: 'تحالف الغابات المطيرة' },
  { id: 'sedex', src: `${base}/2026__04__Sedex_Logo_RGB_Pos-scaled.png`, alt: 'Sedex', altAr: 'سيدكس' },
  { id: 'usda', src: `${base}/2026__04__usda-organic-logo.png`, alt: 'USDA Organic', altAr: 'USDA العضوي' },
];
