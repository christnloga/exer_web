import React from 'react';
import RevealElement from '@/components/RevealElement';
import type { Block } from '../../types';
import { HeadingBlock, TextBlock, ImageBlock, CodeBlock, GalleryBlock } from './BlockComponents';

export const BlockRenderer = ({ blocks }: { blocks: Block[] }) => {
    if (!blocks || blocks.length === 0) return null;

    return (
        <div className="case-study-blocks space-y-8 lg:space-y-12">
            {blocks.map((block) => {
                let content = null;
                switch (block.type) {
                    case 'heading':
                        content = <HeadingBlock data={block.data as any} />;
                        break;
                    case 'text':
                        content = <TextBlock data={block.data as any} />;
                        break;
                    case 'image':
                        content = <ImageBlock data={block.data as any} />;
                        break;
                    case 'code_snippet':
                        content = <CodeBlock data={block.data as any} />;
                        break;
                    case 'gallery':
                        content = <GalleryBlock data={block.data as any} />;
                        break;
                    default:
                        return null;
                }

                return (
                    <RevealElement key={block.id}>
                        {content}
                    </RevealElement>
                );
            })}
        </div>
    );
};
