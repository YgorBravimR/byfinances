import SparklesText from "./magicui/sparkles-text"

export const HomeTitle = async () => {
  const user = "Byplo da Silva"

  return (
    <div className="mb-4 ml-2">
      <h1>
        <SparklesText
          text={`Hello, ${user.split(" ")[0]}!`}
          className="text-3xl"
        />
      </h1>
      <h3 className="ml-0.5">
        Welcome to your Haus <span className="text-xxs">(pre-alpha)</span>
      </h3>
    </div>
  )
}
