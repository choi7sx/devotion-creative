/** Keep CMS regions on content leaves; layout and interactive controls stay intact. */
export const homepageProp = (key: string) => `@data[homepage].${key}`;

export const editableText = (key: string) => ({
  "data-editable": "text",
  "data-prop": homepageProp(key),
  "data-type": "span",
});

export const editableImage = (key: string, altKey?: string) => ({
  "data-editable": "image",
  "data-prop-src": homepageProp(`${key}.image`),
  ...(altKey ? { "data-prop-alt": homepageProp(`${key}.${altKey}`) } : {}),
});
