import  { type ComponentType} from "react";

export interface WithLoadingProps {
    isLoading: boolean;
    error?: string | null;
}

export function withLoading<P extends object>(
    WrappedComponent: ComponentType<P>
) {
    return function WithLoadingComponent({
        isLoading,
        error,
        ...props
    }: P & WithLoadingProps) {
        if (isLoading) {
            return (
                <div style={{width: "900px"}}>Загрузка...</div>
            )
        }

        if (error) {
            return (
                <div>Ошибка:{error}</div>
            )
        }
        return <WrappedComponent {...(props as P)}/>
    }
}