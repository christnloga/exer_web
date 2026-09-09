import { useReducer } from 'react';
import type { Block, BlockType } from '../types';

type State = { blocks: Block[]; isDirty: boolean };
type Action =
    | { type: 'ADD_BLOCK'; payload: { type: BlockType; index?: number } }
    | { type: 'REMOVE_BLOCK'; payload: { id: string } }
    | { type: 'UPDATE_BLOCK'; payload: { id: string; data: any } }
    | { type: 'MOVE_BLOCK'; payload: { fromIndex: number; toIndex: number } }
    | { type: 'DUPLICATE_BLOCK'; payload: { id: string } }
    | { type: 'TRANSFORM_BLOCK'; payload: { id: string; newType: BlockType } };

const initialBlockData = (type: BlockType) => {
    switch (type) {
        case 'heading':
            return { text: '', level: 2 };
        case 'image':
            return { url: '', caption: '' };
        case 'code_snippet':
            return { code: '', language: 'typescript' };
        case 'gallery':
            return { images: [] };
        default:
            return { content: '' };
    }
};

const generateId = () => {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID();
    }
    return 'id-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 9);
};

function editorReducer(state: State, action: Action): State {
    switch (action.type) {
        case 'ADD_BLOCK': {
            const newBlock: Block = {
                id: generateId(),
                type: action.payload.type,
                data: initialBlockData(action.payload.type) as any,
            };
            const newBlocks = [...state.blocks];
            const insertAt = action.payload.index ?? state.blocks.length;
            newBlocks.splice(insertAt, 0, newBlock);
            return { ...state, blocks: newBlocks, isDirty: true };
        }
        case 'UPDATE_BLOCK':
            return {
                ...state,
                blocks: state.blocks.map((b) =>
                    b.id === action.payload.id
                        ? { ...b, data: { ...b.data, ...action.payload.data } }
                        : b,
                ),
                isDirty: true,
            };
        case 'REMOVE_BLOCK':
            return {
                ...state,
                blocks: state.blocks.filter((b) => b.id !== action.payload.id),
                isDirty: true,
            };
        case 'MOVE_BLOCK': {
            const newBlocks = [...state.blocks];
            const [movedItem] = newBlocks.splice(action.payload.fromIndex, 1);
            newBlocks.splice(action.payload.toIndex, 0, movedItem);
            return { ...state, blocks: newBlocks, isDirty: true };
        }
        case 'DUPLICATE_BLOCK': {
            const index = state.blocks.findIndex(
                (b) => b.id === action.payload.id,
            );
            if (index === -1) return state;
            const blockToCopy = state.blocks[index];
            const newBlock: Block = {
                ...blockToCopy,
                id: generateId(),
                data: JSON.parse(JSON.stringify(blockToCopy.data)),
            };
            const newBlocks = [...state.blocks];
            newBlocks.splice(index + 1, 0, newBlock);
            return { ...state, blocks: newBlocks, isDirty: true };
        }
        case 'TRANSFORM_BLOCK': {
            const index = state.blocks.findIndex(
                (b) => b.id === action.payload.id,
            );
            if (index === -1) return state;

            const newBlocks = [...state.blocks];
            const oldBlock = newBlocks[index];
            const newType = action.payload.newType;
            let newData: any = {};

            switch (newType) {
                case 'heading':
                    newData = {
                        text: oldBlock.type === 'text' ? oldBlock.data.content?.split('\n')[0] || '' : '',
                        level: 2,
                    };
                    break;
                case 'text':
                    newData = {
                        content: oldBlock.type === 'heading' ? oldBlock.data.text || '' : 
                                 oldBlock.type === 'code_snippet' ? oldBlock.data.code || '' : '',
                    };
                    break;
                case 'code_snippet':
                    newData = {
                        code: oldBlock.type === 'text' ? oldBlock.data.content || '' : '',
                        language: 'typescript'
                    };
                    break;
                case 'gallery':
                    newData = { 
                        images: oldBlock.type === 'image' && oldBlock.data.url ? [oldBlock.data] : [] 
                    };
                    break;
                case 'image':
                    newData = {
                        url: oldBlock.type === 'gallery' && oldBlock.data.images?.length > 0 ? oldBlock.data.images[0].url : '',
                        caption: oldBlock.type === 'gallery' && oldBlock.data.images?.length > 0 ? oldBlock.data.images[0].caption : '',
                    };
                    break;
                default:
                    newData = initialBlockData(newType);
            }

            newBlocks[index] = {
                ...oldBlock,
                type: newType,
                data: newData,
            };

            return { ...state, blocks: newBlocks, isDirty: true };
        }
        default:
            return state;
    }
}

export function useCaseStudyBuilder(initialBlocks: Block[] = []) {
    const [state, dispatch] = useReducer(editorReducer, {
        blocks: initialBlocks,
        isDirty: false,
    });

    return {
        blocks: state.blocks,
        addBlock: (type: BlockType, index?: number) =>
            dispatch({ type: 'ADD_BLOCK', payload: { type, index } }),
        updateBlock: (id: string, data: any) =>
            dispatch({ type: 'UPDATE_BLOCK', payload: { id, data } }),
        removeBlock: (id: string) =>
            dispatch({ type: 'REMOVE_BLOCK', payload: { id } }),
        moveBlock: (from: number, to: number) =>
            dispatch({
                type: 'MOVE_BLOCK',
                payload: { fromIndex: from, toIndex: to },
            }),
        duplicateBlock: (id: string) =>
            dispatch({ type: 'DUPLICATE_BLOCK', payload: { id } }),
        transformBlock: (id: string, newType: BlockType) =>
            dispatch({ type: 'TRANSFORM_BLOCK', payload: { id, newType } }),
        getPayloadForDB: () =>
            JSON.stringify(
                state.blocks.map(({ type, data }) => ({ type, data })),
            ),
    };
}
