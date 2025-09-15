import React, { useEffect, useState } from 'react';
import {Card, CardFooter, Image, Button} from "@heroui/react";
import api from '../../utils/api.js';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const { data } = await api.get('/skills');
        if (!isMounted) return;
        setSkills(data?.data || []);
      } catch (err) {
        setError('Failed to load skills');
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => { isMounted = false; };
  }, []);

  return (
    <section id="skills" className="section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title"><span className="section-number">04.</span> Skills</h2>
          <div className="section-line"></div>
        </div>
        <div className="skills-content grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {loading && <p>Loading skills…</p>}
          {error && !loading && <p className="text-red-600">{error}</p>}
          {!loading && !error && skills.length === 0 && <p>No skills yet.</p>}
          {!loading && !error && skills.map((skill) => (
            <Card key={skill._id} className="border-none p-4 flex flex-col items-center text-center" radius="lg">
              {skill.imageUrl && (
                <Image alt={skill.name} className="object-cover" height={80} width={80} src={skill.imageUrl} />
              )}
              <div className="mt-2">
                <h4 className="font-medium">{skill.name}</h4>
                {skill.category && <p className="text-xs text-gray-500">{skill.category}</p>}
                {skill.level && <p className="text-xs text-gray-500">{skill.level}</p>}
              </div>
            </Card>
          ))}
        </div>

        <Card isFooterBlurred className="border-none" radius="lg">
      <Image
        alt="Woman listing to music"
        className="object-cover"
        height={200}
        src="https://heroui.com/images/hero-card.jpeg"
        width={200}
      />
      <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <p className="text-tiny text-white/80">Explore my skills.</p>
        <Button
          className="text-tiny text-white bg-black/20"
          color="default"
          radius="lg"
          size="sm"
          variant="flat"
        >
          Notify me
        </Button>
      </CardFooter>
    </Card>
      </div>
    </section>
  );
};

export default Skills;
