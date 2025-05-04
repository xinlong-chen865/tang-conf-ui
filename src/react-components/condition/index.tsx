import { type JSX } from 'react';

const isArray = (arg: any): boolean => {
    if (Array.isArray) {
        return Array.isArray(arg);
    }
    return Object.prototype.toString.call(arg) === '[object Array]';
};

interface CaseProps {
    if?: boolean;
    elseif?: boolean;
    else?: boolean;
    children: JSX.Element | JSX.Element[];
}

export const Case = (props: CaseProps) => {
    return <>{props.children}</>;
};

export const When = ({ children }: { children: any }): JSX.Element | null => {
    if (!children) {
        return null;
    }

    let schildren: any = [];
    if (isArray(children)) {
        schildren = children;
    } else {
        schildren.push(children);
    }
    schildren.forEach((child: any) => {
        if (!child.type || child.type.name !== Case.name) {
            throw new Error('the children of component When muse be component Case');
        }
    });
    const ifChildren = schildren.filter((item: any) => item.props.if);
    if (ifChildren.length) {
        return <>{ifChildren}</>;
    }
    const elseIfChildren = schildren.filter((item: any) => item.props.elseif);
    if (elseIfChildren.length) {
        return <>{elseIfChildren[0]}</>;
    }
    // 返回其他的节点
    return <>{schildren.filter((item: any) => item.props.else)}</>;
};