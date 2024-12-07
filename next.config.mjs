/** @type {import('next').NextConfig} */
import path from "path";
const nextConfig = {
  webpack: (config, options) => {
    config.resolve.alias["@shaders"] = path.join(process.cwd(), "app/shaders");
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      use: ["raw-loader", "glslify", "glslify-loader"],
    });
    return config;
  },
};

export default nextConfig;
