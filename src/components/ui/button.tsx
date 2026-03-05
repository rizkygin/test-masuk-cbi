import * as React from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { }

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className = "", style, ...props }, ref) => {
        return (
            <button
                ref={ref}
                style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'row', gap: '0.5rem', cursor: 'pointer', border: '1px solid black', borderRadius: '5px', ...style }}
                className={`hover:bg-gray-200/90 h-10 px-4 py-2 rounded-md ${className}`}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button }
