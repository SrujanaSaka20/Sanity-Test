import {HomeIcon} from '@sanity/icons'
import {defineArrayMember, defineField} from 'sanity'
import { GROUPS } from '../../constants'
import { CustomLinkTree } from '../../components/CustomLinkTree'

const TITLE = 'Home'

export const SN_LINK = 'link';
export const snlink = {
  name: SN_LINK,
  title: 'Link',
  type: 'object',
  fields: [
    {
      name: 'label',
      title: 'Label',
      type: 'string',
      // validation: (Rule: { required: () => any }) => Rule.required(),
    },
    {
      name: 'url',
      title: 'Url',
      type: 'string',
    },
    {
      name: 'isTargetBlank',
      title: 'Open in a new tab',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'sublinks',
      title: 'Sublinks',
      type: 'array',
      of: [
        {
          type: SN_LINK,
        },
      ],
    },
  ],

  preview: {
    select: {
      label: 'label',
      url: 'url',
    },
    prepare({ label, url }: { label?: string; url?: string }) {
      return {
        title: label,
        subtitle: `Url: ${url}`,
      };
    },
  },
};


export const homeType = defineField({
  name: 'home',
  title: TITLE,
  type: 'document',
  icon: HomeIcon,
  groups: GROUPS,
  fields: [
    defineField({
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [
        {
          type: SN_LINK,
        },
      ],
      // group: TABS.properties,
      group: 'editorial',
      components: { input: CustomLinkTree },
    }),
    defineField({
      name: 'hero',
      type: 'hero',
      group: 'editorial',
    }),
    defineField({
      name: 'modules',
      type: 'array',
      of: [
        defineArrayMember({ type: 'accordion' }),
        defineArrayMember({ type: 'callout' }),
        defineArrayMember({ type: 'grid' }),
        defineArrayMember({ type: 'images' }),
        defineArrayMember({ type: 'imageWithProductHotspots', title: 'Image with Hotspots' }),
        defineArrayMember({ type: 'instagram' }),
        defineArrayMember({ type: 'products' }),
      ],
      group: 'editorial',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return {
        media: HomeIcon,
        subtitle: 'Index',
        title: TITLE,
      }
    },
  },
})
