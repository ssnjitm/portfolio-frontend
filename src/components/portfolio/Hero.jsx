import { useEffect } from "react";
import useWebContentStore from "../../store/useWebContentStore";
import TypingEffect from "./TypingEffect";

const FLOAT_SYMBOLS = [
  { text: "</>",  top: "10%",  left: "5%",   delay: "0s",   size: "text-2xl" },
  { text: "{}",   top: "20%",  right: "8%",  delay: "0.6s", size: "text-3xl" },
  { text: "=>",   top: "70%",  left: "3%",   delay: "1.1s", size: "text-xl"  },
  { text: "[]",   bottom:"15%",right: "5%",  delay: "1.7s", size: "text-2xl" },
  { text: "//",   top: "45%",  left: "92%",  delay: "2.2s", size: "text-lg"  },
  { text: "&&",   top: "80%",  left: "88%",  delay: "0.9s", size: "text-xl"  },
];

const codeSnippet = `
<span class="code-comment">// Welcome to my portfolio</span>
<span class="code-keyword">class</span> <span class="code-class">Developer</span> {
  <span class="code-keyword">constructor</span>() {
    <span class="code-this">this</span>.name = <span class="code-string">"Sanjeet Mijar"</span>;
    <span class="code-this">this</span>.role = <span class="code-string">"Full-Stack Developer"</span>;
    <span class="code-this">this</span>.skills = [<span class="code-string">"JavaScript"</span>, <span class="code-string">"React"</span>, <span class="code-string">"Node.js"</span>];
    <span class="code-this">this</span>.location = <span class="code-string">"Bagdol, Lalitpur"</span>;
  }

  <span class="code-function">sayHello</span>() {
    <span class="code-keyword">return</span> <span class="code-string">\`Hi, I'm \${this.name}. Welcome!\`</span>;
  }
}

<span class="code-keyword">const</span> me = <span class="code-keyword">new</span> <span class="code-class">Developer</span>();
console.<span class="code-function">log</span>(me.<span class="code-function">sayHello</span>());
`;

const styleMap = {
  "code-comment":  "text-gray-500 italic",
  "code-keyword":  "text-blue-400",
  "code-class":    "text-purple-400",
  "code-this":     "text-orange-400",
  "code-string":   "text-green-400",
  "code-function": "text-yellow-400",
};

function buildHtml(snippet) {
  return snippet.replace(/class="([^"]*)"/g, (_, cls) =>
    `class="${cls} ${styleMap[cls] || "text-gray-300"}"`
  );
}

const Hero = () => {
  const { webContent, fetchWebContent, error, loading } = useWebContentStore();

  useEffect(() => { fetchWebContent(); }, [fetchWebContent]);

  if (loading) return (
    <section className="min-h-screen flex items-center justify-center bg-gray-950">
      <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </section>
  );
  if (error || !webContent) return null;

  return (
    <>
      <style>{`
        .code-editor-wrap { perspective: 1000px; }
        .code-editor-tilt {
          transform: rotateY(-5deg) rotateX(2deg);
          transition: transform 0.4s ease;
        }
        .code-editor-tilt:hover {
          transform: rotateY(0deg) rotateX(0deg);
        }
      `}</style>

      <section
        id="hero"
        className="hero min-h-screen flex items-center bg-white dark:bg-gray-950 pt-20 relative overflow-hidden"
      >
        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(99,102,241,0.13) 1.5px, transparent 1.5px)",
            backgroundSize: "30px 30px",
          }}
        />

        {/* Blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-3xl" />
        </div>

        {/* Floating symbols */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
          {FLOAT_SYMBOLS.map((sym, i) => (
            <span
              key={i}
              className={`absolute font-mono font-bold ${sym.size} text-blue-400/20 dark:text-blue-400/15 animate-float`}
              style={{ top: sym.top, left: sym.left, right: sym.right, bottom: sym.bottom, animationDelay: sym.delay }}
            >
              {sym.text}
            </span>
          ))}
        </div>

        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="hero-content flex flex-col lg:flex-row items-center gap-12">

            {/* Left — text */}
            <div className="hero-text flex-1 text-center lg:text-left">
              <div className="tag-line inline-flex items-center justify-center lg:justify-start mb-6 text-lg font-mono">
                <span className="text-blue-500 dark:text-blue-400 mr-2">const</span>
                <span className="text-purple-500 dark:text-purple-400">developer</span>
                <span className="text-gray-400 mx-2">=</span>
                <span className="text-blue-500 dark:text-blue-400">{"{"}</span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                Sanjeet Mijar
              </h1>
              <h2 className="text-2xl text-gray-600 dark:text-gray-300 mb-6 font-semibold min-h-[2rem]">
                <TypingEffect
                  text={["Full-Stack Developer", "React Developer", "Node.js Developer", "UI/UX Enthusiast"]}
                  typingSpeed={60}
                  deletingSpeed={35}
                  pauseDuration={2000}
                  loop={true}
                  showCursor={true}
                  cursorCharacter="|"
                  cursorBlinkDuration={0.5}
                  textColors={["#60a5fa", "#a78bfa", "#34d399", "#f472b6"]}
                  className="text-2xl font-semibold"
                />
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-lg mb-8 max-w-2xl mx-auto lg:mx-0">
                I build exceptional digital experiences with clean, efficient code.
                Specializing in modern web technologies and scalable architecture.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a
                  href={webContent.downloadCVLink}
                  download
                  className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-500 hover:to-purple-500 transition-all duration-200 shadow-lg shadow-blue-500/25"
                >
                  Download CV
                </a>
                <a
                  href="#contact"
                  className="inline-block border-2 border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-8 py-3 rounded-lg font-semibold hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 dark:hover:border-blue-500 transition-all duration-200"
                >
                  Contact Me
                </a>
              </div>

              <div className="tag-line inline-flex items-center justify-center lg:justify-start mt-6 text-lg font-mono">
                <span className="text-blue-500 dark:text-blue-400">{"}"}</span>
              </div>
            </div>

            {/* Right — interactive code editor */}
            <div className="hero-visual flex-1 flex justify-center w-full">
              <div className="code-editor-wrap w-full max-w-lg p-6">
                <div className="code-editor-tilt relative w-full bg-[#1e1e2e] rounded-xl shadow-2xl border border-gray-700/50">
                  {/* Title bar */}
                  <div className="flex items-center justify-between bg-[#2d2d3a] px-4 py-2 border-b border-gray-600/50 rounded-t-xl">
                    <div className="flex space-x-2">
                      <span className="w-3 h-3 bg-red-500 rounded-full" />
                      <span className="w-3 h-3 bg-yellow-500 rounded-full" />
                      <span className="w-3 h-3 bg-green-500 rounded-full" />
                    </div>
                    <span className="text-xs text-gray-400 font-mono">developer.js</span>
                    <span className="text-xs text-gray-600 font-mono">JS</span>
                  </div>
                  {/* Code body */}
                  <div className="relative p-6 bg-[#1e1e2e] rounded-b-xl">
                    <pre className="text-sm text-gray-100 font-mono leading-relaxed whitespace-pre-wrap">
                      <code dangerouslySetInnerHTML={{ __html: buildHtml(codeSnippet) }} />
                    </pre>
                    <div className="absolute right-6 bottom-4 w-px h-5 bg-white animate-blink" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
