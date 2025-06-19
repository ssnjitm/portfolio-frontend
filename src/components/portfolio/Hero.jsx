
const Hero = () => {
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
    <section className="hero" id="hero">
      <div className="container hero-content">
        <div className="hero-text">
          <div className="tag-line">
            <span className="tag">const</span>{' '}
            <span className="variable">developer</span>{' '}
            <span className="operator">=</span>{' '}
            <span className="curly-brace">{'{'}</span>
          </div>
          <h1 className="" data-text="Sanjeet Mijar">Sanjeet Mijar</h1>
          <h2>Full-Stack Developer</h2>
          <p className="hero-description">
            I build exceptional digital experiences with clean, efficient code. Specializing in modern web technologies and scalable architecture.
          </p>
          <div className="hero-cta">
            <a href="#projects" className="btn btn-primary">Download CV</a>
            <a href="#contact" className="btn btn-outline">Contact Me</a>
          </div>
          <div className="tag-line closing">
            <span className="curly-brace">{'}'}</span>
          </div>
        </div>

        {/* Code Editor Visual */}
        <div className="hero-visual">
          <div className="code-editor bg-[#1e1e2f] rounded-lg shadow-md">
            <div className="code-editor-header">
              <div className="dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className="filename">developer.js</div>
            </div>
            <div className="code-editor-body">
              <pre>
                <code dangerouslySetInnerHTML={{ __html: codeSnippet }} />
              </pre>
              <div className="cursor"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
