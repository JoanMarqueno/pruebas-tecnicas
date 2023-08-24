import React from "react";
import Icon from "@mdi/react";
import { mdiHeart } from "@mdi/js";

type Props = {
  isFavorite: boolean;
};

function Heart({ isFavorite }: Props) {
  const iconColor = isFavorite ? "#D73A18" : "#FFFFFF";

  return (
    <div>
      {/* Changing the color of the heart icon based on isFavorite prop */}
      <Icon path={mdiHeart} size={1} color={iconColor} title="Heart Icon" />
    </div>
  );
}

export default Heart;
