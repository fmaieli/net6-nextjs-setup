import { Button } from "primereact/button";

export function HeaderButton({ label, selected, onClick }) {
    return <Button
        className={
            'p-button p-component p-button-raised p-button-secondary  font-bold h-10' + (selected ? '' : ' p-button-text')
        }
        label={label}
        onClick={() => onClick()}
    />
}