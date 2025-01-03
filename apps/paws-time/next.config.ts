import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["paws-time-bucket.s3.ap-northeast-2.amazonaws.com"], // 이미지 호스트 도메인 추가
  },
};

export default nextConfig;
