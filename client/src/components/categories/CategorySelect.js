export const CategorySelect = ({
  categories,
  handlePickCategory,
  category,
}) => {
  return (
    <select name="category" onChange={handlePickCategory} value={category}>
      <option value="">Choose</option>
      {categories.map((cat, index) => (
        <option key={index} value={cat.name}>
          {cat.name}
        </option>
      ))}
    </select>
  );
};
