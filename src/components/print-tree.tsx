import "./print-tree.css";

import { FC, ReactElement, useEffect, useRef, useState } from "react";
import * as d3 from "d3";

import { Node } from "./bst";
type PrintTreeProps = {
  node: Node;
};

const PrintTreeNode: FC<PrintTreeProps> = ({
  node,
}: PrintTreeProps): ReactElement => {
  return (
    <div className="tree">
      <div className="value">
        <span> {node.value} </span>
      </div>
      <div className="children">
        {node.left ? (
          <PrintTreeNode node={node.left} />
        ) : (
          <div className="tree">null</div>
        )}
        {node.right ? (
          <PrintTreeNode node={node.right} />
        ) : (
          <div className="tree">null</div>
        )}
      </div>
    </div>
  );
};

const PrintTree: FC<PrintTreeProps> = ({
  node,
}: PrintTreeProps): ReactElement => {
  const [svgCanvas, setSVG] = useState<
    d3.Selection<SVGSVGElement, unknown, null, undefined>
  >();
  let canvas = useRef<HTMLDivElement>(null);

  useEffect(
    function () {
      if (canvas.current) {
        canvas.current.innerHTML = "";
      }
      setSVG(
        d3
          .select(canvas.current)
          .append("svg")
          .attr("width", 600)
          .attr("height", 400)
          .style("border", "1px solid black")
      );
    },
    [canvas]
  );
  useEffect(
    function () {
      if (svgCanvas) {
        const data = [1, 2, 3];
        svgCanvas
          .selectAll("circle")
          .data(data)
          .join((enter) => enter.append("circle").attr("r", 10))
          .attr("cx", (d, i) => d * 10)
          .attr("cy", (d, i) => i * 50);
      }
    },
    [svgCanvas]
  );
  return (
    <div className="tree">
      <div className="value">
        <div className="a-canvas" ref={canvas}></div>
        <span> {node.value} </span>
      </div>
      <div className="children">
        {node.left ? (
          <PrintTreeNode node={node.left} />
        ) : (
          <div className="tree">null</div>
        )}
        {node.right ? (
          <PrintTreeNode node={node.right} />
        ) : (
          <div className="tree">null</div>
        )}
      </div>
    </div>
  );
};

export default PrintTree;
