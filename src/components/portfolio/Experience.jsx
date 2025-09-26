// src/components/sections/ExperienceSection.jsx
import { useEffect, useMemo } from "react";
import useExperienceStore from "../../store/useExperienceStore";

function formatRange(from, to, current) {
  const fmt = (d) => (d ? new Date(d).getFullYear() : "");
  const start = fmt(from);
  const end = current ? "current" : fmt(to) || "—";
  return start && end ? `${start}-${end}` : start || end || "";
}

export default function ExperienceSection() {
  const { experiences, loading, error, fetchExperiences } = useExperienceStore();

  useEffect(() => {
    fetchExperiences();
  }, [fetchExperiences]);

  const content = useMemo(() => {
    if (loading) {
      return (
        <div className="space-y-6" aria-busy="true">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-28 rounded-xl bg-gray-200 dark:bg-gray-700 animate-pulse"
            />
          ))}
        </div>
      );
    }

    if (error) {
      return (
        <p className="text-center text-red-600 dark:text-red-400">{error}</p>
      );
    }

    if (experiences.length === 0) {
      return (
        <p className="text-center text-gray-600 dark:text-gray-400">
          No experience yet.
        </p>
      );
    }

    return (
      <div className="space-y-6">
        {experiences.map((exp) => (
          <article
            key={exp._id}
            className="rounded-xl bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 shadow-md hover:shadow-xl transition-shadow duration-300 p-6"
          >
            {/* Company */}
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">
              {exp.companyName}
            </h3>

            {/* Years */}
            <p className="text-blue-600 dark:text-blue-400 font-medium">
              {formatRange(exp.from, exp.to, exp.current)}
            </p>

            {/* Role */}
            {exp.role && (
              <p className="mt-1 text-gray-700 dark:text-gray-300">
                {exp.role}
              </p>
            )}

            {/* Description */}
            {exp.description && (
              <p className="mt-3 text-gray-600 dark:text-gray-400 leading-relaxed">
                {exp.description}
              </p>
            )}
          </article>
        ))}
      </div>
    );
  }, [experiences, loading, error]);

  return (
    <section
      id="experience"
      className="py-20 bg-gray-50 dark:bg-gray-800"
      aria-labelledby="experience-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="mb-12 text-center">
          <h2
            id="experience-heading"
            className="inline-flex items-center justify-center text-3xl font-bold text-gray-800 dark:text-white"
          >
            Experience
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-4 rounded"></div>
        </div>

        {content}
      </div>
    </section>
  );
}
