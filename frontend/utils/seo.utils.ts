import type { SeoSettingPage } from "~/types/seo";
import SeoThumb from "~/assets/images/seo/thumb-seo.webp";

export const setupSeoFromSettingObject = (seo: SeoSettingPage) => {
  const title = seo.title ?? "";
  const description = seo.description ?? "";
  const thumb = seo.thumb ?? SeoThumb;

  useHead({
    title,
    meta: [
      {
        name: "description",
        content: description,
      },
      {
        property: "og:image",
        content: thumb,
      },
    ],
  });

  useSeoMeta({
    title,
    ogTitle: title,
    description,
    ogDescription: description,
    ogImage: thumb,
    twitterCard: "summary_large_image",
  });
};
