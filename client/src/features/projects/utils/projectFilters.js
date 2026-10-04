/**
 * Utility functions for project filtering, counts, and categorization.
 */

export function filterProjectsByCategory(projects, filter) {
  if (!filter || filter === 'all') return projects;
  return projects.filter((item) => {
    if (Array.isArray(item.category)) {
      return item.category.includes(filter);
    }
    return item.category === filter;
  });
}

export function calculateProjectCategoryCounts(projects) {
  const devCount = projects.filter((p) =>
    Array.isArray(p.category) ? p.category.includes('development') : p.category === 'development'
  ).length;

  const designCount = projects.filter((p) =>
    Array.isArray(p.category) ? p.category.includes('design') : p.category === 'design'
  ).length;

  return {
    all: projects.length,
    development: devCount,
    design: designCount,
  };
}
