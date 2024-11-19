export default function Dashboard() {
    return (
        <div className="flex flex-wrap gap-4">
            <Wrapper>a</Wrapper>
            <Wrapper>b</Wrapper>
            <Wrapper>c</Wrapper>
            <Wrapper>d</Wrapper>
        </div>
    )
}

const Wrapper = ({children}) => {
    return <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center min-w-[200px] sm:w-[45%] md:w-[30%] lg:w-[22%]">{children}</div>
}