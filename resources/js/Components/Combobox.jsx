import { useState } from "react";
import { Combobox as HeadlessCombobox } from "@headlessui/react";

export default function Combobox({ options = [], value, onChange, className, placeholder = "" }) {
    const [query, setQuery] = useState("");

    const filteredOptions =
        query === ""
            ? options
            : options.filter((option) => {
                  return option.toLowerCase().includes(query.toLowerCase());
              });

    return (
        <HeadlessCombobox value={value} onChange={onChange}>
            <div className="relative">
                <div className={"flex " + className}>
                    <HeadlessCombobox.Input
                        className={"grow"}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder={placeholder}
                        autoComplete="off"
                    />
                    <HeadlessCombobox.Button>
                        <i className="bi bi-chevron-expand"></i>
                    </HeadlessCombobox.Button>
                </div>
                <HeadlessCombobox.Options
                    className={
                        "absolute z-50 w-full max-h-60 mt-2 bg-gray-100 text-sm shadow rounded-lg overflow-auto"
                    }
                >
                    {query.length > 0 && (
                        <HeadlessCombobox.Option
                            value={query}
                            className={({active}) => `px-4 py-2 ${active ? 'bg-info text-info-content' : ''}`}
                        >
                            Create "{query}"
                        </HeadlessCombobox.Option>
                    )}

                    {filteredOptions.map((option) => (
                        <HeadlessCombobox.Option
                            key={option}
                            value={option}
                            className={({active}) => `px-4 py-2 ${active ? 'bg-info text-info-content' : ''}`}
                        >
                            {option}
                        </HeadlessCombobox.Option>
                    ))}
                </HeadlessCombobox.Options>
            </div>
        </HeadlessCombobox>
    );
}
