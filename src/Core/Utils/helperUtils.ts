export interface IClassNamesProps {
    [key: string]: string | boolean;
}

export const classnames = (props: IClassNamesProps): string => {
    const arr: Array<string> = [];
    Object.entries(props).forEach(([key, value]) => {
        if (value) {
            arr.push(key);
        }
    });
    return arr.join(' ');
};
