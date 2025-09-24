import { useEffect } from "react";
import useWebContentStore from "../../store/useWebContentStore";
import TypingEffect from "./TypingEffect";

const Hero = () => {

const {
    webContent,
    fetchWebContent,
    error,
    loading,
    success,
  } = useWebContentStore();

useEffect(() => {
    fetchWebContent();
  }, [fetchWebContent]);


  if (loading) return <p>Loading content...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!webContent) return <p>No content available</p>;

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
    <span class="code-keyword">return</span> <span class="code-string">\`Hi, I'm \${this.name}. Welcome to my portfolio!\`</span>;
  }
}

<span class="code-keyword">const</span> me = <span class="code-keyword">new</span> <span class="code-class">Developer</span>();
console.<span class="code-function">log</span>(me.<span class="code-function">sayHello</span>());
`;

  return (
    <>
      <style>
        {`
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
          .animate-blink {
            animation: blink 0.8s step-end infinite;
          }
          .code-editor-container {
            perspective: 1000px;
          }
        `}
      </style>
      
      <section className="hero min-h-screen flex items-center bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 pt-20" id="hero">
        
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                       
          <div className="hero-content flex flex-col lg:flex-row items-center gap-12">
            <div className="hero-text flex-1 text-center lg:text-left">
              <div className="tag-line inline-flex items-center justify-center lg:justify-start mb-6 text-lg font-mono">
                <span className="tag text-blue-600 mr-2">const</span>{' '}
                <span className="variable text-purple-600">developer</span>{' '}
                <span className="operator text-gray-600">=</span>{' '}
                <span className="curly-brace text-blue-600">{'{'}</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 dark:text-white mb-4 leading-tight" data-text="Sanjeet Mijar">Sanjeet Mijar</h1>
              <h2 className="text-2xl text-gray-600 dark:text-gray-300 mb-6 font-semibold">{webContent.heroTitle}</h2>
              <p className="hero-description text-gray-600 dark:text-gray-400 text-lg mb-8 max-w-2xl mx-auto lg:mx-0">
                {webContent.heroDescription}
              </p>
          
              <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a href={webContent.downloadCVLink}
                download
                 className="btn btn-primary inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-md">Download CV</a>
                <a href="#contact" className="btn btn-outline inline-block border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-all duration-200">Contact Me</a>
              </div>
              <div className="tag-line closing inline-flex items-center justify-center lg:justify-start mt-6 text-lg font-mono">
                <span className="curly-brace text-blue-600">{`}`}</span>
              </div>
            </div>

            {/* Code Editor Visual */}
            <div className="hero-visual flex-1 flex justify-center lg:justify-center w-full">
              <div className="code-editor-container w-full max-w-lg p-6">
                <div className="code-editor relative w-full bg-[#1e1e2e] rounded-xl shadow-2xl border border-gray-700/50 transform rotate-y-[-5deg] hover:rotate-y-0 transition-transform duration-300">
                  <div className="code-editor-header flex items-center justify-between bg-[#2d2d3a] px-4 py-2 border-b border-gray-600/50 rounded-t-xl">
                    <div className="dots flex space-x-2">
                      <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                      <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                      <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                    </div>
                    <div className="filename text-xs text-gray-400 font-mono">developer.js</div>
                  </div>
                  <div className="code-editor-body relative p-6 bg-[#1e1e2e] rounded-b-xl">
                    <pre className="text-sm text-gray-100 font-mono leading-relaxed whitespace-pre-wrap">
                      <code dangerouslySetInnerHTML={{
                        __html: codeSnippet.replace(/class="([^"]*)"/g, (match, className) => {
                          const styleMap = {
                            'code-comment': 'text-gray-400 italic',
                            'code-keyword': 'text-blue-400',
                            'code-class': 'text-purple-400',
                            'code-this': 'text-orange-400',
                            'code-string': 'text-green-400',
                            'code-function': 'text-yellow-400'
                          };
                          return `class="${className} ${styleMap[className] || ''}"`;
                        })
                      }} />
                    </pre>
                    <div className="cursor absolute right-6 bottom-4 w-px h-5 bg-white animate-blink"></div>
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