(() => {
  const canvas = document.querySelector("#systems-canvas");
  if (!canvas) return;
  const gl = canvas.getContext("webgl", { antialias: true, alpha: false });
  if (!gl) {
    canvas.closest(".systems-field").classList.add("webgl-unavailable");
    return;
  }

  const vertexSource = `
    attribute vec3 aPosition;
    uniform mat4 uProjection;
    uniform mat4 uView;
    uniform float uPointSize;
    void main() {
      vec4 viewPosition = uView * vec4(aPosition, 1.0);
      gl_Position = uProjection * viewPosition;
      gl_PointSize = uPointSize * (4.6 / -viewPosition.z);
    }
  `;
  const fragmentSource = `
    precision mediump float;
    uniform vec4 uColor;
    uniform float uRound;
    void main() {
      if (uRound > 0.5) {
        vec2 point = gl_PointCoord - vec2(0.5);
        if (dot(point, point) > 0.25) discard;
      }
      gl_FragColor = uColor;
    }
  `;

  const compile = (type, source) => {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader));
    return shader;
  };
  const program = gl.createProgram();
  gl.attachShader(program, compile(gl.VERTEX_SHADER, vertexSource));
  gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragmentSource));
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
  gl.useProgram(program);

  const positionLocation = gl.getAttribLocation(program, "aPosition");
  const projectionLocation = gl.getUniformLocation(program, "uProjection");
  const viewLocation = gl.getUniformLocation(program, "uView");
  const colorLocation = gl.getUniformLocation(program, "uColor");
  const sizeLocation = gl.getUniformLocation(program, "uPointSize");
  const roundLocation = gl.getUniformLocation(program, "uRound");
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);

  const nodeCount = 36;
  const nodes = Array.from({ length: nodeCount }, (_, index) => {
    const angle = index * 2.399963;
    const y = 1 - (index / (nodeCount - 1)) * 2;
    const radius = Math.sqrt(1 - y * y);
    const scale = 1.55 + .18 * Math.sin(index * 1.7);
    const origin = [Math.cos(angle) * radius * scale, y * scale, Math.sin(angle) * radius * scale];
    return { origin, p: [...origin], v: [0, 0, 0] };
  });
  const edges = [];
  nodes.forEach((node, index) => {
    const distances = nodes.map((other, otherIndex) => ({
      index: otherIndex,
      distance: Math.hypot(node.origin[0] - other.origin[0], node.origin[1] - other.origin[1], node.origin[2] - other.origin[2])
    })).filter((item) => item.index !== index).sort((a, b) => a.distance - b.distance);
    distances.slice(0, 3).forEach((item) => {
      const a = Math.min(index, item.index);
      const b = Math.max(index, item.index);
      if (!edges.some((edge) => edge.a === a && edge.b === b)) edges.push({ a, b, rest: item.distance });
    });
  });

  const identity = () => new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]);
  const projection = identity();
  const view = identity();
  const pointer = { x: 0, y: 0, active: false, strength: 0 };
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let rotation = 0;
  let last = performance.now();
  let visible = true;
  let frame = 0;

  const setPointer = (event) => {
    const rect = canvas.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
    pointer.active = true;
    pointer.strength = Math.min(1.8, pointer.strength + .38);
  };
  canvas.addEventListener("pointerdown", (event) => { canvas.setPointerCapture(event.pointerId); setPointer(event); });
  canvas.addEventListener("pointermove", (event) => { if (event.pointerType === "mouse" || pointer.active) setPointer(event); });
  canvas.addEventListener("pointerup", () => { pointer.active = false; });
  canvas.addEventListener("pointercancel", () => { pointer.active = false; });

  const resize = () => {
    const dpr = Math.min(devicePixelRatio || 1, 1.7);
    const width = Math.round(canvas.clientWidth * dpr);
    const height = Math.round(canvas.clientHeight * dpr);
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
    }
    const aspect = width / height;
    const f = 1 / Math.tan(Math.PI / 6);
    projection.set([f/aspect,0,0,0,0,f,0,0,0,0,-1.002,-1,0,0,-.2002,0]);
  };

  const update = (dt) => {
    const spring = .85;
    const damping = Math.pow(.965, dt * 60);
    edges.forEach((edge) => {
      const a = nodes[edge.a], b = nodes[edge.b];
      const dx = b.p[0] - a.p[0], dy = b.p[1] - a.p[1], dz = b.p[2] - a.p[2];
      const distance = Math.max(.001, Math.hypot(dx, dy, dz));
      const force = (distance - edge.rest) * spring * dt;
      const fx = dx / distance * force, fy = dy / distance * force, fz = dz / distance * force;
      a.v[0] += fx; a.v[1] += fy; a.v[2] += fz;
      b.v[0] -= fx; b.v[1] -= fy; b.v[2] -= fz;
    });
    nodes.forEach((node, index) => {
      for (let axis = 0; axis < 3; axis++) node.v[axis] += (node.origin[axis] - node.p[axis]) * .28 * dt;
      if (pointer.strength > .01) {
        const screenX = node.p[0] / 2.2;
        const screenY = node.p[1] / 2.2;
        const dx = screenX - pointer.x, dy = screenY - pointer.y;
        const distance = Math.max(.09, Math.hypot(dx, dy));
        if (distance < .62) {
          const force = (1 - distance / .62) * pointer.strength * dt * 5;
          node.v[0] += dx / distance * force;
          node.v[1] += dy / distance * force;
          node.v[2] += Math.sin(index * 2.1 + frame * .04) * force * .7;
        }
      }
      node.v[0] *= damping; node.v[1] *= damping; node.v[2] *= damping;
      node.p[0] += node.v[0]; node.p[1] += node.v[1]; node.p[2] += node.v[2];
    });
    pointer.strength *= Math.pow(.94, dt * 60);
  };

  const draw = (time) => {
    if (!visible) { requestAnimationFrame(draw); return; }
    resize();
    const dt = Math.min(.025, (time - last) / 1000);
    last = time;
    frame += 1;
    if (!reduced) update(dt);
    rotation += reduced ? 0 : dt * .11;
    const c = Math.cos(rotation), s = Math.sin(rotation);
    const sceneOffsetX = innerWidth < 900 ? 1.15 : 1.45;
    view.set([c,0,-s,0, s*.08,.996,c*.08,0, s,-.08,c,0, sceneOffsetX,0,-5.4,1]);
    gl.clearColor(.012,.02,.04,1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.uniformMatrix4fv(projectionLocation, false, projection);
    gl.uniformMatrix4fv(viewLocation, false, view);

    const lineData = new Float32Array(edges.length * 6);
    edges.forEach((edge, index) => {
      lineData.set(nodes[edge.a].p, index * 6);
      lineData.set(nodes[edge.b].p, index * 6 + 3);
    });
    gl.bufferData(gl.ARRAY_BUFFER, lineData, gl.DYNAMIC_DRAW);
    gl.uniform4f(colorLocation, .19, .36, 1, .34);
    gl.uniform1f(roundLocation, 0);
    gl.drawArrays(gl.LINES, 0, edges.length * 2);

    const pointData = new Float32Array(nodes.flatMap((node) => node.p));
    gl.bufferData(gl.ARRAY_BUFFER, pointData, gl.DYNAMIC_DRAW);
    gl.uniform4f(colorLocation, .78, 1, .18, .95);
    gl.uniform1f(sizeLocation, innerWidth < 600 ? 13 : 16);
    gl.uniform1f(roundLocation, 1);
    gl.drawArrays(gl.POINTS, 0, nodeCount);

    if (frame % 10 === 0) {
      const energy = nodes.reduce((sum, node) => sum + Math.hypot(...node.v), 0) * 10;
      const readout = document.querySelector("#field-energy");
      if (readout) readout.textContent = (document.documentElement.lang === "ko" ? "에너지 " : "ENERGY ") + energy.toFixed(1).padStart(4, "0");
    }
    requestAnimationFrame(draw);
  };
  new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) last = performance.now(); }, { rootMargin: "120px" }).observe(canvas);
  requestAnimationFrame(draw);
})();
