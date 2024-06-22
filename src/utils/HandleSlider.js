export function handleSlider(direction, setFunction) {
  direction === "-"
    ? setFunction((prevSlider) => ({
        start: prevSlider.start - 1,
        end: prevSlider.end - 1,
      }))
    : setFunction((prevSlider) => ({
        start: prevSlider.start + 1,
        end: prevSlider.end + 1,
      }));
}
