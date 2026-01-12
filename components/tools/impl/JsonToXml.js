"use client";
import React, { useState } from 'react';
import { ArrowLeftRight, Copy, Check, X, FileJson, Code } from 'lucide-react';

export default function JsonToXml() {
    const [json, setJson] = useState('');
    const [xml, setXml] = useState('');
    const [error, setError] = useState(null);
    const [copied, setCopied] = useState(false);

    // Simple JSON to XML Converter
    const jsonToXml = (obj) => {
        let xmlStr = '';
        for (let prop in obj) {
            xmlStr += obj[prop] instanceof Array ? '' : '<' + prop + '>';
            if (obj[prop] instanceof Array) {
                for (let array in obj[prop]) {
                    xmlStr += '<' + prop + '>';
                    xmlStr += jsonToXml(new Object(obj[prop][array]));
                    xmlStr += '</' + prop + '>';
                }
            } else if (typeof obj[prop] == 'object') {
                xmlStr += jsonToXml(new Object(obj[prop]));
            } else {
                xmlStr += obj[prop];
            }
            xmlStr += obj[prop] instanceof Array ? '' : '</' + prop + '>';
        }
        xmlStr = xmlStr.replace(/<\/?[0-9]{1,}>/g, '');
        return xmlStr;
    };

    // Simple XML to JSON Converter (Basic)
    const xmlToJson = (xml) => {
        // This is a naive implementation. For production robust parsing, a library is better.
        // However, for this environment without external libs, we try a DOMParser approach.
        try {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xml, "text/xml");
            if (xmlDoc.querySelector("parsererror")) throw new Error("Invalid XML");

            function xmlToObj(xml) {
                let obj = {};
                if (xml.nodeType === 1) { // element
                    if (xml.attributes.length > 0) {
                        obj["@attributes"] = {};
                        for (let j = 0; j < xml.attributes.length; j++) {
                            const attribute = xml.attributes.item(j);
                            obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
                        }
                    }
                } else if (xml.nodeType === 3) { // text
                    obj = xml.nodeValue;
                }

                if (xml.hasChildNodes()) {
                    for (let i = 0; i < xml.childNodes.length; i++) {
                        const item = xml.childNodes.item(i);
                        const nodeName = item.nodeName;
                        if (typeof (obj[nodeName]) === "undefined") {
                            const val = xmlToObj(item);
                            // Handle text-only nodes cleaner
                            if (item.nodeType === 3 && item.nodeValue.trim() === '') continue;
                            if (item.nodeType === 3) return item.nodeValue;
                            obj[nodeName] = val;
                        } else {
                            if (typeof (obj[nodeName].push) === "undefined") {
                                const old = obj[nodeName];
                                obj[nodeName] = [];
                                obj[nodeName].push(old);
                            }
                            obj[nodeName].push(xmlToObj(item));
                        }
                    }
                }
                return obj;
            }
            return xmlToObj(xmlDoc.documentElement); // Basic root handling
        } catch (e) {
            throw new Error("Unable to parse XML: " + e.message);
        }
    };

    const handleConvert = (direction) => {
        setError(null);
        try {
            if (direction === 'toXml') {
                if (!json.trim()) return;
                const obj = JSON.parse(json);
                const result = jsonToXml(obj);
                setXml('<root>' + result + '</root>'); // Wrap in root
            } else {
                if (!xml.trim()) return;
                const result = xmlToJson(xml);
                setJson(JSON.stringify(result, null, 2));
            }
        } catch (err) {
            setError(err.message);
        }
    };

    const copyToClipboard = (text) => {
        if (!text) return;
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-col gap-6 h-[calc(100vh-250px)] min-h-[600px]">
            <div className="grid lg:grid-cols-2 gap-6 flex-1">
                {/* JSON Input */}
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between mb-3">
                        <label className="text-sm font-bold text-text-secondary uppercase tracking-wider flex items-center gap-2">
                            <FileJson size={14} /> JSON
                        </label>
                        <div className="flex gap-2">
                            <button onClick={() => setJson('')} className="text-xs text-text-tertiary hover:text-accent-primary">Clear</button>
                            <button
                                onClick={() => handleConvert('toXml')}
                                className="text-xs bg-accent-primary text-white px-2 py-1 rounded hover:bg-accent-hover font-bold"
                            >
                                Convert to XML &rarr;
                            </button>
                        </div>
                    </div>
                    <textarea
                        className="flex-1 bg-surface border border-border rounded-xl p-4 font-mono text-sm outline-none focus:border-accent-primary resize-none text-text-primary"
                        value={json}
                        onChange={(e) => setJson(e.target.value)}
                        placeholder='{"key": "value"}'
                    />
                </div>

                {/* XML Input */}
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between mb-3">
                        <label className="text-sm font-bold text-text-secondary uppercase tracking-wider flex items-center gap-2">
                            <Code size={14} /> XML
                        </label>
                        <div className="flex gap-2">
                            <button onClick={() => setXml('')} className="text-xs text-text-tertiary hover:text-accent-primary">Clear</button>
                            <button
                                onClick={() => handleConvert('toJson')}
                                className="text-xs bg-accent-primary text-white px-2 py-1 rounded hover:bg-accent-hover font-bold"
                            >
                                &larr; Convert to JSON
                            </button>
                        </div>
                    </div>
                    <textarea
                        className="flex-1 bg-surface border border-border rounded-xl p-4 font-mono text-sm outline-none focus:border-accent-primary resize-none text-text-primary"
                        value={xml}
                        onChange={(e) => setXml(e.target.value)}
                        placeholder='<root><key>value</key></root>'
                    />
                </div>
            </div>

            {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm font-bold text-center">
                    {error}
                </div>
            )}
        </div>
    );
}
