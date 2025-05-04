import { useEffect, useRef, useState, type FC } from "react";
import { Case, Error, When } from "@react-components/index";

interface IItem {
    name: string;
    label: string;
    type: string;
    required?: boolean;
    autocomplete?: string;
    placeholder?: string;
    options?: Record<string, string>;
    defaultValue?: any;
    hint?: string;
    show?: boolean;
    preview?: string;
    accept?: string;
    download?: () => void;
}


interface IProps {
    formId: string;
    items: IItem[];
    submitText: string;
    onSubmit: (responses: Record<string, any>) => any;
    onSuccess: (responses: Record<string, any>) => any | undefined;
    onError: (responses: Record<string, any>) => any | undefined;
    onClose: () => any | undefined;
    values: Record<string, any>;
    title: string | undefined;
    text: string | undefined;
    modal: boolean;
}

const Form: FC<Partial<IProps>> = (props) => {
    const {
        formId = Math.random().toString(36).replace(".", ""),
        items = [],
        submitText = undefined,
        onSubmit = undefined,
        onSuccess = undefined,
        onError = undefined,
        onClose = undefined,
        values = {},
        title = undefined,
        text = undefined,
        modal = false,
    } = props;

    const [state, setState] = useState('ready')
    const [error, setError] = useState('');
    const [responses, setResponses] = useState<Record<string, any>>({});

    const reset = () => {
        // items.forEach((item) => {
        //     if (item.defaultValue) responses[item.name] = item.defaultValue;
        //     else if (typeof values[item.name] !== "undefined") {
        //         if (item.type === "array" && Array.isArray(values[item.name]))
        //             responses[item.name] = values[item.name].join(", ");
        //         else responses[item.name] = values[item.name];
        //     } else if (item.type === "checkbox" || item.type === "radio") responses[item.name] = false;
        //     else if (item.type === "multiple") responses[item.name] = [];
        //     else if (item.type === "enum" && Object.keys(item.options || {}).length)
        //         responses[item.name] = Object.keys(item.options || {})[0];
        //     else responses[item.name] = "";
        // });
        // setResponses(responses);
    };
    reset();

    const send = () => {
        // setState("loading");
        // const submitResponses = { ...responses };
        // Object.keys(submitResponses).forEach((key) => {
        //     const item = items.find((i) => i.name === key);
        //     if (item) {
        //         if (item.type === "array" && typeof submitResponses[key] === "string")
        //             submitResponses[key] = (submitResponses[key] as string)
        //                 .split(",")
        //                 .map((i) => i.trim())
        //                 .filter((i) => !!i);
        //     }
        // });
        // Promise.resolve(onSubmit?.(submitResponses))
        //     .then((val: any) => {
        //         if (typeof onSuccess === "function") onSuccess(val);
        //         setState("done");
        //         setTimeout(() => {
        //             setState("ready");
        //         }, 5000);
        //     })
        //     .catch((err) => {
        //         setError(err.message);
        //         if (typeof onError === "function") onError(err.message);
        //         setState("ready");
        //         setTimeout(() => {
        //             setError('');
        //             if (typeof onError === "function") onError(err.message);
        //         }, 10000);
        //     });

        // if (!modal) reset();
    };
    const updateValue = (key: string, type: string, event: Event) => {
        if (type === "number") responses[key] = Number((event.target as HTMLInputElement).value);
        else if (type === "checkbox" || type === "radio")
            responses[key] = (event.target as HTMLInputElement).checked;
        else if (type === "file" || type === "image")
            responses[key] = (event.target as HTMLInputElement).files;
        else if (type === "multiple") {
            responses[key] = Array.from((event.target as HTMLSelectElement).options)
                .filter((i) => i.selected)
                .map((i) => i.value);
        } else responses[key] = (event.target as HTMLInputElement).value;
        setResponses(responses);
    };

    return (
        <form onSubmit={send}>
            {error && <Error error={error} />}

            <fieldset className={modal ? `bg-white p-4 sm:p-6 space-y-4` : 'space-y-4'}>
                <div>
                    {title && <h2 className="text-xl mb-2">{title}</h2>}
                    {text && <p className="text-gray-500 text-sm">{text}</p>}
                </div>
                {
                    items.map((item, index) => {
                        return (
                            <When key={index}>

                                <Case if={item.type === 'enum' && Object.keys(item.options || {}).length < 5}>
                                    <div className="text-sm font-medium text-gray-700">{item.label}</div>
                                    <div className="flex">
                                        {
                                            Object.keys(item.options || {}).map((value) => {
                                                return (
                                                    <div className="flex items-start mt-2 mr-4">
                                                        <div className="flex items-center h-5">
                                                            <input
                                                                id={`${formId}_${item.name}_${value}`}
                                                                onInput={(event) => updateValue(item.name, item.type, event)}
                                                                name={item.name}
                                                                value={value}
                                                                checked={value === responses[item.name]}
                                                                type="radio"
                                                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 transition motion-reduce:transition-none rounded-full"
                                                            />
                                                        </div>
                                                        <div className="ml-2 text-sm">
                                                            <div>
                                                                <label
                                                                    htmlFor={`${formId}_${item.name}_${value}`}
                                                                    className="text-gray-700">{item.options && item.options[value]}</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </Case>

                                <Case elseif={item.type === 'enum'}>
                                    <label
                                        htmlFor={`${formId}_${item.name}`}
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        {item.label}
                                    </label>
                                    <select
                                        onBlur={(event) => updateValue(item.name, item.type, event)}
                                        value={responses[item.name]}
                                        name={item.name}
                                        id={`${formId}_${item.name}`}
                                        className="mt-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md transition motion-reduce:transition-none p-2"
                                        aria-placeholder={item.placeholder}
                                        autoComplete={item.autocomplete}
                                        required={item.required}
                                    >
                                        {
                                            Object.keys(item.options || {}).map((key) => {
                                                return (
                                                    <option value={key}>{item.options?.[key]}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </Case>

                                <Case else>
                                    <label
                                        htmlFor={`${formId}_${item.name}`}
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        {item.label}
                                    </label>
                                    <input
                                        type={item.type || 'text'}
                                        onInput={(event) => updateValue(item.name, item.type, event)}
                                        value={responses[item.name]}
                                        name={item.name}
                                        id={`${formId}_${item.name}`}
                                        className="mt-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md transition motion-reduce:transition-none"
                                        placeholder={item.placeholder}
                                        autoComplete={item.autocomplete}
                                        required={item.required}
                                    />
                                </Case>

                            </When>

                        )
                    })
                }
            </fieldset>
        </form>
    )
}

export default Form;