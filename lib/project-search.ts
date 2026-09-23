import type { Project } from '../data/profile.ts';

export function searchProjects(projects: Project[], query: string) {
  const normalized = query.toLowerCase().trim();
  if (!normalized) return projects;

  return projects.filter((project) => (
    `${project.title} ${project.shortTitle} ${project.label} ${project.summary} ${project.technologies.join(' ')}`
      .toLowerCase()
      .includes(normalized)
  ));
}
