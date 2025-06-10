import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { bundleMDX } from 'mdx-bundler';
import { slugify } from '@personal-website/utils';

// Types
export interface BlogPostFrontmatter {
  title: string;
  date: string;
  description: string;
  categories: string[];
  featured?: boolean;
  coverImage?: string;
}

export interface BlogPost {
  slug: string;
  frontmatter: BlogPostFrontmatter;
  code: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  projectUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

// Blog post utilities
export async function getBlogPosts(postsDirectory: string): Promise<BlogPost[]> {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const files = fs.readdirSync(postsDirectory);
  const mdxFiles = files.filter((file) => /\.mdx?$/.test(file));
  
  const posts = await Promise.all(
    mdxFiles.map(async (file) => {
      const slug = file.replace(/\.mdx?$/, '');
      const filePath = path.join(postsDirectory, file);
      return await getBlogPostBySlug(slug, filePath);
    })
  );
  
  // Sort posts by date (newest first)
  return posts.sort((a, b) => {
    return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
  });
}

export async function getBlogPostBySlug(slug: string, filePath: string): Promise<BlogPost> {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { code, frontmatter } = await processMdx(fileContent);
  
  return {
    slug,
    frontmatter: frontmatter as BlogPostFrontmatter,
    code,
  };
}

async function processMdx(source: string): Promise<{ code: string; frontmatter: Record<string, any> }> {
  // Extract frontmatter
  const { content, data } = matter(source);
  
  // Bundle MDX content
  const result = await bundleMDX({
    source: content,
  });
  
  return {
    code: result.code,
    frontmatter: data,
  };
}

export function getBlogCategories(posts: BlogPost[]): string[] {
  const categoriesSet = new Set<string>();
  
  posts.forEach((post) => {
    post.frontmatter.categories.forEach((category) => {
      categoriesSet.add(category);
    });
  });
  
  return Array.from(categoriesSet).sort();
}

export function getPostsByCategory(posts: BlogPost[], category: string): BlogPost[] {
  return posts.filter((post) => 
    post.frontmatter.categories.includes(category)
  );
}

export function getFeaturedPosts(posts: BlogPost[], count: number = 3): BlogPost[] {
  const featured = posts.filter((post) => post.frontmatter.featured);
  
  if (featured.length >= count) {
    return featured.slice(0, count);
  }
  
  // If there aren't enough featured posts, add the most recent ones
  return [
    ...featured,
    ...posts
      .filter((post) => !post.frontmatter.featured)
      .slice(0, count - featured.length)
  ].slice(0, count);
}

// Portfolio utilities
export function getPortfolioItems(filePath: string): PortfolioItem[] {
  if (!fs.existsSync(filePath)) {
    return [];
  }
  
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const items: PortfolioItem[] = JSON.parse(fileContent);
  
  return items;
}

export function getPortfolioTechnologies(items: PortfolioItem[]): string[] {
  const technologiesSet = new Set<string>();
  
  items.forEach((item) => {
    item.technologies.forEach((tech) => {
      technologiesSet.add(tech);
    });
  });
  
  return Array.from(technologiesSet).sort();
}

export function getItemsByTechnology(items: PortfolioItem[], technology: string): PortfolioItem[] {
  return items.filter((item) => 
    item.technologies.includes(technology)
  );
}

export function getFeaturedPortfolioItems(items: PortfolioItem[], count: number = 3): PortfolioItem[] {
  const featured = items.filter((item) => item.featured);
  
  if (featured.length >= count) {
    return featured.slice(0, count);
  }
  
  // If there aren't enough featured items, return all available items
  return [
    ...featured,
    ...items.filter((item) => !item.featured)
  ].slice(0, count);
}

// Helper to create new blog post
export function createBlogPostTemplate(title: string, categories: string[] = []): string {
  const slug = slugify(title);
  const date = new Date().toISOString().split('T')[0];
  
  return `---
title: "${title}"
date: "${date}"
description: "Write your post description here."
categories: [${categories.map(cat => `"${cat}"`).join(', ')}]
---

## Introduction

Write your post content here. You can use **Markdown** and also _React components_.

## Main Content

More content here...

## Conclusion

Conclusion paragraph here.
`;
}

// Helper to create new portfolio item
export function createPortfolioItem(title: string, description: string, technologies: string[]): PortfolioItem {
  return {
    id: slugify(title),
    title,
    description,
    technologies,
    imageUrl: "/placeholder.jpg",
    featured: false
  };
}