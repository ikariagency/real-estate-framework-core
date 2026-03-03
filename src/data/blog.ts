export interface BlogPost {
  slug: string;
  image: string;
  titleEs: string;
  titleEn: string;
  excerptEs: string;
  excerptEn: string;
  date: string;
  category: string;
  categoryEn: string;
  contentEs: string;
  contentEn: string;
}

export const blogPosts: BlogPost[] = [];
