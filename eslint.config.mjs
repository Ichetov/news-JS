import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(
    {
        ignores: ['dist/**', 'src/**/*.js'],
    },

    {
        files: ['*.{js,cjs,mjs}'],
        ...js.configs.recommended,
        languageOptions: {
            globals: globals.node,
        },
    },

    {
        files: ['src/**/*.{ts,tsx}'],
        extends: [js.configs.recommended, ...tseslint.configs.recommended],
        languageOptions: {
            globals: globals.browser,
        },
        rules: {
            'no-debugger': 'off',
            'no-console': 'off',
            '@typescript-eslint/no-explicit-any': 'error',
        },
    },

    prettierConfig
);
