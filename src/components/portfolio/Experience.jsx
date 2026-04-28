import { useEffect, useMemo } from "react";
import useExperienceStore from "../../store/useExperienceStore";

function formatRange(from, to, current) {
  const fmt = (d) => (d ? new Date(d).getFullYear() : "");
  const start = fmt(from);
  const end = current ? "Present" : fmt(to) || "—";
  return start ? `${start} – ${end}` : end;
}

export default function ExperienceSection() {
  const { experiences, loading, error, fetchExperiences } = useExperienceStore();

  useEffect(() => { fetchExperiences(); }, [fetchExperiences]);

  const content = useMemo(() => {
    if (loading) {
      return (
        <div className="space-y-4 max-w-3xl mx-auto">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-28 rounded-xl bg-gray-200 dark:bg-gray-800 animate-pulse" />
          ))}
        </div>
      );
    }
    if (error) {
      return <p className="text-center text-red-500">Error: {error}</p>;
    }
    if (experiences.length === 0) {
      return <p className="text-center text-gray-400">No experience data available.</p>;
    }

    return (
      <div className="space-y-5 max-w-3xl mx-auto">
        {experiences.map((exp) => (
          <article
            key={exp._id}
            className="relative group rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 shadow-sm hover:shadow-md transition-all duration-300 p-6 overflow-hidden"
          >
            {/* Left accent bar */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-l-xl" />

            <div className="ml-4">
              <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {exp.companyName}
                </h3>
                <span className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 px-2.5 py-1 rounded-full">
                  {formatRange(exp.from, exp.to, exp.current)}
                </span>
              </div>

              {exp.role && (
                <p className="text-sm font-semibold text-purple-600 dark:text-purple-400 mb-2">
                  {exp.role}
                </p>
              )}

              {exp.description && (
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {exp.description}
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
    );
  }, [experiences, loading, error]);

  return (
    <section id="experience" className="py-24 bg-white dark:bg-gray-950" aria-labelledby="experience-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <h2 id="experience-heading" className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Experience
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
        </div>
        {content}
      </div>
    </section>
  );
}
