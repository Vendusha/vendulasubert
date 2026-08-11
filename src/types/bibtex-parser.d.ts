declare module '@retorquere/bibtex-parser' {
	export interface BibTeXAuthor {
		firstName?: string;
		lastName?: string;
	}

	export interface BibTeXEntry {
		key: string;
		type: string;
		fields: Record<string, unknown>;
	}

	export interface ParseOptions {
		sentenceCase?: boolean;
	}

	export interface ParseResult {
		entries: BibTeXEntry[];
		errors: unknown[];
	}

	export function parse(source: string, options?: ParseOptions): ParseResult;
}
