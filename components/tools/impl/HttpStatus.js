"use client";
import React, { useState } from 'react';
import { Search, Info, Globe } from 'lucide-react';

const STATUS_CODES = {
    100: { title: "Continue", desc: "The server has received the request headers and the client should proceed to send the request body." },
    101: { title: "Switching Protocols", desc: "The requester has asked the server to switch protocols." },
    200: { title: "OK", desc: "Standard response for successful HTTP requests." },
    201: { title: "Created", desc: "The request has been fulfilled, resulting in the creation of a new resource." },
    202: { title: "Accepted", desc: "The request has been accepted for processing, but the processing has not been completed." },
    204: { title: "No Content", desc: "The server successfully processed the request and is not returning any content." },
    301: { title: "Moved Permanently", desc: "The URL of the requested resource has been changed permanently." },
    302: { title: "Found", desc: "The URL of the requested resource has been changed temporarily." },
    304: { title: "Not Modified", desc: "Indicates that the resource has not been modified since the version specified by the request headers." },
    307: { title: "Temporary Redirect", desc: "The method and the body will not be changed when optimized redirected." },
    308: { title: "Permanent Redirect", desc: "The method and body of the original request are reused." },
    400: { title: "Bad Request", desc: "The server cannot or will not process the request due to an apparent client error." },
    401: { title: "Unauthorized", desc: "Authentication is required and has failed or has not been provided." },
    403: { title: "Forbidden", desc: "The request contained valid data and was understood by the server, but the server is refusing action." },
    404: { title: "Not Found", desc: "The requested resource could not be found but may be available in the future." },
    405: { title: "Method Not Allowed", desc: "A request method is not supported for the requested resource." },
    418: { title: "I'm a teapot", desc: "The server refuses the attempt to brew coffee with a teapot." },
    429: { title: "Too Many Requests", desc: "The user has sent too many requests in a given amount of time." },
    500: { title: "Internal Server Error", desc: "A generic error message, given when an unexpected condition was encountered." },
    501: { title: "Not Implemented", desc: "The server either does not recognize the request method, or it lacks the ability to fulfill the request." },
    502: { title: "Bad Gateway", desc: "The server was acting as a gateway or proxy and received an invalid response from the upstream server." },
    503: { title: "Service Unavailable", desc: "The server is currently unavailable (overloaded or down for maintenance)." },
    504: { title: "Gateway Timeout", desc: "The server was acting as a gateway or proxy and did not receive a timely response from the upstream server." },
};

export default function HttpStatus() {
    const [search, setSearch] = useState('');

    const filteredCodes = Object.entries(STATUS_CODES).filter(([code, data]) => {
        const query = search.toLowerCase();
        return code.includes(query) || data.title.toLowerCase().includes(query) || data.desc.toLowerCase().includes(query);
    });

    const getColor = (code) => {
        if (code.startsWith('2')) return 'bg-green-500/10 text-green-500 border-green-500/20';
        if (code.startsWith('3')) return 'bg-accent-info/10 text-accent-info border-accent-info/20';
        if (code.startsWith('4')) return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
        if (code.startsWith('5')) return 'bg-red-500/10 text-red-500 border-red-500/20';
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-surface border border-border p-4 rounded-xl flex items-center gap-3 sticky top-0 md:static z-10 shadow-lg md:shadow-none">
                <Search size={20} className="text-text-tertiary" />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by code or description (e.g. 404, Redirect)..."
                    className="flex-1 bg-transparent outline-none text-text-primary placeholder:text-text-tertiary"
                    autoFocus
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredCodes.map(([code, data]) => (
                    <div key={code} className={`p-4 rounded-xl border flex flex-col gap-2 transition-all hover:-translate-y-1 ${getColor(code)} bg-opacity-10 dark:bg-opacity-5`}>
                        <div className="flex items-center justify-between">
                            <span className="text-2xl font-black">{code}</span>
                            <Globe size={16} className="opacity-50" />
                        </div>
                        <h3 className="font-bold text-lg leading-tight">{data.title}</h3>
                        <p className="text-sm opacity-80 leading-relaxed">{data.desc}</p>
                    </div>
                ))}

                {filteredCodes.length === 0 && (
                    <div className="col-span-1 md:col-span-2 text-center py-12 text-text-tertiary">
                        <Info size={48} className="mx-auto mb-4 opacity-50" />
                        <p>No status codes found matching "{search}"</p>
                    </div>
                )}
            </div>
        </div>
    );
}
