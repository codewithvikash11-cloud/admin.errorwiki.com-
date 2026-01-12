import {
    Braces, FileCode, Key, Fingerprint, Hash, Palette, Text, Terminal, Minimize2, FileText, Code2, Table, Link, Search, Wifi, Globe, Activity, Lock, Eye, Shuffle, Delete, Scissors, Type, Image, Cpu, Database, Binary, Code, Command, CreditCard, Smile, User, Mail, ShieldCheck, MapPin, Zap, QrCode, Smartphone, FileSignature, GitBranch, Shield, Clock, Calculator, Percent, BookOpen, KeyRound, Languages, FileJson, Settings, Camera, AlertCircle, PlayCircle, BarChart
} from 'lucide-react';

export const TOOLS_CATEGORIES = {
    FORMATTERS: 'Formatters',
    ENCODERS: 'Encoders & Decoders',
    GENERATORS: 'Generators',
    SECURITY: 'Hashing & Security', // Renamed from HASHING for broader scope
    TEXT: 'Text Tools',
    CONVERTERS: 'Converters',
    WEB: 'Web & API',
    DEV: 'Developer Utils',
    MATH: 'Math & Time',
    MISC: 'Miscellaneous'
};

export const TOOLS_REGISTRY = [
    // --- FORMATTERS ---
    { id: 'json-formatter', title: 'JSON Formatter', description: 'Validate, prettify, and minify your JSON data.', icon: Braces, category: TOOLS_CATEGORIES.FORMATTERS, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },
    { id: 'xml-formatter', title: 'XML Formatter', description: 'Prettify XML strings with proper indentation.', icon: Code, category: TOOLS_CATEGORIES.FORMATTERS, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },
    { id: 'sql-formatter', title: 'SQL Formatter', description: 'Format and beautify complex SQL queries.', icon: Database, category: TOOLS_CATEGORIES.FORMATTERS, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },
    { id: 'yaml-formatter', title: 'YAML Formatter', description: 'Validate and format YAML files.', icon: Table, category: TOOLS_CATEGORIES.FORMATTERS, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },
    { id: 'code-beautifier', title: 'Code Beautifier', description: 'Format JS, CSS, and HTML code.', icon: Code2, category: TOOLS_CATEGORIES.FORMATTERS, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },

    // --- ENCODERS & DECODERS ---
    { id: 'base64', title: 'Base64 Converter', description: 'Encode/Decode text and files to Base64.', icon: FileCode, category: TOOLS_CATEGORIES.ENCODERS, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },
    { id: 'base64-file', title: 'Base64 File', description: 'Convert files/images to Base64 strings.', icon: FileJson, category: TOOLS_CATEGORIES.ENCODERS, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },
    { id: 'jwt-decoder', title: 'JWT Decoder', description: 'Decode and inspect JWT tokens.', icon: Key, category: TOOLS_CATEGORIES.ENCODERS, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },
    { id: 'url-encoder', title: 'URL Encode/Decode', description: 'Encode or decode URL parameters.', icon: Link, category: TOOLS_CATEGORIES.ENCODERS, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },
    { id: 'html-entity', title: 'HTML Entity', description: 'Escape or unescape HTML entities.', icon: Code, category: TOOLS_CATEGORIES.ENCODERS, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },
    { id: 'outlook-safelink', title: 'Safelink Decoder', description: 'Decode Outlook Safe Links.', icon: Link, category: TOOLS_CATEGORIES.ENCODERS, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },
    { id: 'mime-types', title: 'MIME Types', description: 'Lookup MIME types for file extensions.', icon: FileText, category: TOOLS_CATEGORIES.ENCODERS, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },

    // --- GENERATORS ---
    { id: 'uuid-generator', title: 'UUID Generator', description: 'Generate singular or bulk UUIDs (v4).', icon: Fingerprint, category: TOOLS_CATEGORIES.GENERATORS, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },
    { id: 'ulid-generator', title: 'ULID Generator', description: 'Generate Universally Unique Lexicographically Sortable Identifiers.', icon: Fingerprint, category: TOOLS_CATEGORIES.GENERATORS, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },
    { id: 'random-string', title: 'Random String', description: 'Generate cryptographically strong random strings.', icon: Shuffle, category: TOOLS_CATEGORIES.GENERATORS, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },
    { id: 'lorem-ipsum', title: 'Lorem Ipsum', description: 'Generate placeholder text.', icon: Type, category: TOOLS_CATEGORIES.GENERATORS, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },
    { id: 'qr-code', title: 'QR Code Gen', description: 'Generate custom QR codes.', icon: QrCode, category: TOOLS_CATEGORIES.GENERATORS, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },
    { id: 'wifi-qr', title: 'WiFi QR Code', description: 'Create QR codes for WiFi access.', icon: Wifi, category: TOOLS_CATEGORIES.GENERATORS, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },
    { id: 'svg-placeholder', title: 'SVG Placeholder', description: 'Generate placeholder SVG images.', icon: Image, category: TOOLS_CATEGORIES.GENERATORS, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },
    { id: 'fake-data', title: 'Fake Data', description: 'Generate names, addresses, and emails.', icon: User, category: TOOLS_CATEGORIES.GENERATORS, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },
    { id: 'otp-generator', title: 'OTP Generator', description: 'Generate TOTP/HOTP codes for 2FA.', icon: KeyRound, category: TOOLS_CATEGORIES.GENERATORS, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },

    // --- SECURITY & HASHING ---
    { id: 'token-generator', title: 'Token Generator', description: 'Generate various secure tokens.', icon: Key, category: TOOLS_CATEGORIES.SECURITY, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },
    { id: 'hash-generator', title: 'Hash Text', description: 'MD5, SHA-1, SHA-256, SHA-512 hashing.', icon: Hash, category: TOOLS_CATEGORIES.SECURITY, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },
    { id: 'bcrypt-generator', title: 'Bcrypt Generator', description: 'Hash and verify Bcrypt passwords.', icon: ShieldCheck, category: TOOLS_CATEGORIES.SECURITY, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },
    { id: 'hmac-generator', title: 'HMAC Generator', description: 'Keyed-hash message authentication code.', icon: Shield, category: TOOLS_CATEGORIES.SECURITY, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },
    { id: 'rsa-generator', title: 'RSA Key Pair', description: 'Generate PEM-formatted RSA keys.', icon: Lock, category: TOOLS_CATEGORIES.SECURITY, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },
    { id: 'password-strength', title: 'Password Strength', description: 'Analyze password complexity.', icon: Activity, category: TOOLS_CATEGORIES.SECURITY, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },
    { id: 'password-generator', title: 'Password Gen', description: 'Create strong, secure passwords.', icon: Lock, category: TOOLS_CATEGORIES.SECURITY, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },
    { id: 'bip39-generator', title: 'BIP39 Passphrase', description: 'Generate mnemonic codes for crypto wallets.', icon: Wallet, category: TOOLS_CATEGORIES.SECURITY, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },
    { id: 'pdf-signature', title: 'PDF Signature', description: 'Check PDF digital signatures.', icon: FileSignature, category: TOOLS_CATEGORIES.SECURITY, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },
    { id: 'encrypt-decrypt', title: 'Encrypt/Decrypt', description: 'AES, DES, TripleDES encryption.', icon: Lock, category: TOOLS_CATEGORIES.SECURITY, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },

    // --- CONVERTERS ---
    { id: 'yaml-json', title: 'YAML to JSON', description: 'Convert YAML to JSON format.', icon: FileJson, category: TOOLS_CATEGORIES.CONVERTERS, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },
    { id: 'json-yaml', title: 'JSON to YAML', description: 'Convert JSON to YAML format.', icon: FileCode, category: TOOLS_CATEGORIES.CONVERTERS, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },
    { id: 'json-xml', title: 'JSON to XML', description: 'Convert JSON to XML format.', icon: Code, category: TOOLS_CATEGORIES.CONVERTERS, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },
    { id: 'xml-json', title: 'XML to JSON', description: 'Convert XML to JSON format.', icon: Braces, category: TOOLS_CATEGORIES.CONVERTERS, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },
    { id: 'csv-json', title: 'CSV to JSON', description: 'Convert CSV to JSON format.', icon: Table, category: TOOLS_CATEGORIES.CONVERTERS, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },
    { id: 'json-csv', title: 'JSON to CSV', description: 'Convert JSON to CSV format.', icon: Table, category: TOOLS_CATEGORIES.CONVERTERS, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },
    { id: 'toml-json', title: 'TOML to JSON', description: 'Convert TOML config to JSON.', icon: Settings, category: TOOLS_CATEGORIES.CONVERTERS, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },
    { id: 'json-toml', title: 'JSON to TOML', description: 'Convert JSON to TOML config.', icon: Settings, category: TOOLS_CATEGORIES.CONVERTERS, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },
    { id: 'markdown-html', title: 'Markdown to HTML', description: 'Convert Markdown to raw HTML.', icon: FileText, category: TOOLS_CATEGORIES.CONVERTERS, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },
    { id: 'curl-converter', title: 'Curl to Code', description: 'Convert cURL to Fetch/Axios.', icon: Terminal, category: TOOLS_CATEGORIES.CONVERTERS, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },
    { id: 'color-converter', title: 'Color Converter', description: 'HEX, RGB, HSL, CMYK conversion.', icon: Palette, category: TOOLS_CATEGORIES.CONVERTERS, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },
    { id: 'number-base', title: 'Integer Base', description: 'Convert between Bin, Oct, Dec, Hex.', icon: Binary, category: TOOLS_CATEGORIES.CONVERTERS, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },
    { id: 'roman-numeral', title: 'Roman Numerals', description: 'Convert numbers to Roman numerals.', icon: Type, category: TOOLS_CATEGORIES.CONVERTERS, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },
    { id: 'json-ts', title: 'JSON to TS', description: 'Generate TypeScript interfaces from JSON.', icon: FileCode, category: TOOLS_CATEGORIES.CONVERTERS, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },

    // --- TEXT TOOLS ---
    { id: 'case-converter', title: 'Case Converter', description: 'Camel, Snake, Kebab, Pascal case.', icon: Type, category: TOOLS_CATEGORIES.TEXT, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },
    { id: 'text-diff', title: 'Text Diff', description: 'Compare two text files side by side.', icon: Scissors, category: TOOLS_CATEGORIES.TEXT, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },
    { id: 'word-counter', title: 'Word Counter', description: 'Count words, chars, and lines.', icon: BarChart, category: TOOLS_CATEGORIES.TEXT, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },
    { id: 'remove-duplicates', title: 'Dedup Lines', description: 'Remove duplicate lines from text.', icon: Delete, category: TOOLS_CATEGORIES.TEXT, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },
    { id: 'regex-tester', title: 'Regex Tester', description: 'Test RegExp with cheatsheet.', icon: Search, category: TOOLS_CATEGORIES.TEXT, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },
    { id: 'text-nato', title: 'Text to NATO', description: 'Convert text to NATO phonetic alphabet.', icon: Radio, category: TOOLS_CATEGORIES.TEXT, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },
    { id: 'text-binary', title: 'Text to ASCII', description: 'Convert text to ASCII Binary.', icon: Binary, category: TOOLS_CATEGORIES.TEXT, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },
    { id: 'text-unicode', title: 'Text to Unicode', description: 'Escape text to Unicode characters.', icon: Languages, category: TOOLS_CATEGORIES.TEXT, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },
    { id: 'slugify', title: 'Slugify', description: 'Convert string to URL-friendly slug.', icon: Link, category: TOOLS_CATEGORIES.TEXT, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },
    { id: 'obfuscator', title: 'String Obfuscator', description: 'Obfuscate string via simple encoding.', icon: EyeOff, category: TOOLS_CATEGORIES.TEXT, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },
    { id: 'ascii-art', title: 'ASCII Art', description: 'Generate ASCII art text.', icon: Type, category: TOOLS_CATEGORIES.TEXT, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },
    { id: 'numeronym', title: 'Numeronym', description: 'Create numeronyms (e.g., a11y, k8s).', icon: Type, category: TOOLS_CATEGORIES.TEXT, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },
    { id: 'emoji-picker', title: 'Emoji Picker', description: 'Search and copy emojis easily.', icon: Smile, category: TOOLS_CATEGORIES.TEXT, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },

    // --- WEB & NETWORK ---
    { id: 'user-agent', title: 'User-Agent', description: 'Parse User-Agent strings.', icon: Globe, category: TOOLS_CATEGORIES.WEB, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },
    { id: 'http-status', title: 'HTTP Status', description: 'Lookup HTTP status codes.', icon: Activity, category: TOOLS_CATEGORIES.WEB, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },
    { id: 'meta-generator', title: 'Meta Tags', description: 'Generate SEO meta tags.', icon: Globe, category: TOOLS_CATEGORIES.WEB, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },
    { id: 'og-generator', title: 'Open Graph', description: 'Generate Open Graph meta tags.', icon: Image, category: TOOLS_CATEGORIES.WEB, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },
    { id: 'basic-auth', title: 'Basic Auth', description: 'Generate Basic Auth headers.', icon: Lock, category: TOOLS_CATEGORIES.WEB, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },
    { id: 'url-parser', title: 'URL Parser', description: 'Parse URL into components.', icon: Link, category: TOOLS_CATEGORIES.WEB, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },
    { id: 'ipv4-subnet', title: 'IPv4 Subnet', description: 'Calculate IPv4 subnets (CIDR).', icon: Network, category: TOOLS_CATEGORIES.WEB, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },
    { id: 'ipv6-ula', title: 'IPv6 ULA', description: 'Generate IPv6 Local Addresses.', icon: Network, category: TOOLS_CATEGORIES.WEB, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },
    { id: 'mac-lookup', title: 'MAC Address', description: 'Lookup/Generate MAC addresses.', icon: Cpu, category: TOOLS_CATEGORIES.WEB, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },
    { id: 'ip-lookup', title: 'IP Lookup', description: 'Get details about an IP address.', icon: MapPin, category: TOOLS_CATEGORIES.WEB, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },
    { id: 'dns-lookup', title: 'DNS Lookup', description: 'Check DNS records for a domain.', icon: Globe, category: TOOLS_CATEGORIES.WEB, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },
    { id: 'random-port', title: 'Random Port', description: 'Generate random available port numbers.', icon: Zap, category: TOOLS_CATEGORIES.WEB, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },

    // --- DEVELOPER UTILS ---
    { id: 'git-cheatsheet', title: 'Git Cheatsheet', description: 'Common Git commands reference.', icon: GitBranch, category: TOOLS_CATEGORIES.DEV, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },
    { id: 'chmod-calculator', title: 'Chmod Calc', description: 'Calculate Linux file permissions.', icon: Calculator, category: TOOLS_CATEGORIES.DEV, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },
    { id: 'crontab', title: 'Crontab Gen', description: 'Generate and decode cron expressions.', icon: Clock, category: TOOLS_CATEGORIES.DEV, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },
    { id: 'docker-compose', title: 'Docker Compose', description: 'Convert Docker Run to Compose.', icon: Box, category: TOOLS_CATEGORIES.DEV, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },
    { id: 'keycode-info', title: 'Keycode Info', description: 'Visualizer for Javascript keycodes.', icon: Keyboard, category: TOOLS_CATEGORIES.DEV, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },
    { id: 'device-info', title: 'Device Info', description: 'Get current device information.', icon: Smartphone, category: TOOLS_CATEGORIES.DEV, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },
    { id: 'email-normalizer', title: 'Email Normalize', description: 'Normalize detailed email addresses.', icon: Mail, category: TOOLS_CATEGORIES.DEV, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },
    { id: 'iban-validator', title: 'IBAN Validator', description: 'Validate International Bank Account Numbers.', icon: CreditCard, category: TOOLS_CATEGORIES.DEV, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },

    // --- MATH & TIME ---
    { id: 'date-converter', title: 'Date Converter', description: 'Timestamp and Date conversions.', icon: Calendar, category: TOOLS_CATEGORIES.MATH, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },
    { id: 'math-evaluator', title: 'Math Evaluator', description: 'Evaluate complex mathematical expressions.', icon: Calculator, category: TOOLS_CATEGORIES.MATH, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },
    { id: 'percentage-calculator', title: 'Percentage Calc', description: 'Calculate percentages easily.', icon: Percent, category: TOOLS_CATEGORIES.MATH, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },
    { id: 'eta-calculator', title: 'ETA Calculator', description: 'Estimate time of arrival.', icon: Clock, category: TOOLS_CATEGORIES.MATH, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },

    // --- MISC ---
    { id: 'chronometer', title: 'Chronometer', description: 'Stopwatch and Timer.', icon: Clock, category: TOOLS_CATEGORIES.MISC, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },
    { id: 'temperature-converter', title: 'Temp Converter', description: 'Celsius, Fahrenheit, Kelvin.', icon: Thermometer, category: TOOLS_CATEGORIES.MISC, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },
    { id: 'text-stats', title: 'Text Statistics', description: 'Detailed text analysis.', icon: BarChart, category: TOOLS_CATEGORIES.MISC, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },
    { id: 'camera-recorder', title: 'Camera Recorder', description: 'Record video from webcam.', icon: Camera, category: TOOLS_CATEGORIES.MISC, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },
    { id: 'wysiwyg-editor', title: 'WYSIWYG Editor', description: 'Visual HTML Editor.', icon: Edit, category: TOOLS_CATEGORIES.MISC, color: 'text-accent-primary', bg: 'bg-accent-primary/10' },
];

import {
    Radio, EyeOff, Wallet, Network, Box, Keyboard, Calendar, Watch, Thermometer, Edit
} from 'lucide-react';
