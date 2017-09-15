import { Component, Input } from '@angular/core';
import { CEGConnection } from "../../../../../model/CEGConnection";
import { CEGNode } from "../../../../../model/CEGNode";
import { SpecmateDataService } from "../../../../../services/data/specmate-data.service";
import { Config } from "../../../../../config/config";
import { Proxy } from "../../../../../model/support/proxy";
import { Angles } from "../../util/angles";
import { Coords } from "../../util/coords";
import { GraphicalElementBase } from "../graphical-element-base";
import { IContainer } from "../../../../../model/IContainer";
import { ProcessConnection } from "../../../../../model/ProcessConnection";

@Component({
    moduleId: module.id,
    selector: '[process-graphical-connection]',
    templateUrl: 'process-graphical-connection.component.svg',
    styleUrls: ['process-graphical-connection.component.css']
})
export class ProcessGraphicalConnection extends GraphicalElementBase<ProcessConnection> {
    public nodeType: { className: string; } = ProcessConnection;

    protected nodeWidth: number = Config.CEG_NODE_WIDTH;
    protected nodeHeight: number = Config.CEG_NODE_HEIGHT;

    @Input()
    connection: CEGConnection;

    public get element(): CEGConnection {
        return this.connection;
    }

    @Input()
    nodes: CEGNode[];

    @Input()
    selected: boolean;

    @Input()
    valid: boolean;

    constructor(private dataService: SpecmateDataService) {
        super();
    }

    public get x1(): number {
        return this.c1.x;
    }

    public get y1(): number {
        return this.c1.y;
    }

    public get x2(): number {
        return this.c2.x;
    }

    public get y2(): number {
        return this.c2.y;
    }

    private get c1(): {x: number, y: number} {
        return this.getC(this.sourceNode);
    }

    private get c2(): {x: number, y: number} {
        return this.getC(this.targetNode);
    }

    private getC(node: {x: number, y: number}): {x: number, y: number} {
        return Coords.getCenter(node.x, node.y, this.nodeWidth, this.nodeHeight);
    }

    private get centerX(): number {
        return (this.x1 + this.x2) / 2.0;
    }

    private get centerY(): number {
        return (this.y1 + this.y2) / 2.0;
    }

    private get alpha1(): number {
        return Angles.calcAngle(-this.nodeWidth, -this.nodeHeight);
    }

    private get isLeft(): boolean {
        return this.angle >= -(180 + this.alpha1) && this.angle <= (180 + this.alpha1)
    }

    private get isRight(): boolean {
        return (this.angle >= -this.alpha1 && this.angle <= 180) || (this.angle >= -180 && this.angle <= this.alpha1)
    }

    private get isTop(): boolean {
        return this.angle >= 180 + this.alpha1 && this.angle <= -this.alpha1;
    }

    private get isBelow(): boolean {
        return this.angle >= this.alpha1 && this.angle <= -(180 + this.alpha1);
    }

    public get arrowX(): number {
        if(this.isLeft) {
            return this.x2 - this.nodeWidth / 2;
        } else if(this.isRight) {
            return this.x2 + this.nodeWidth / 2;
        } else if(this.isTop) {
            return this.x2 - ((this.nodeHeight / 2) / Math.tan(this.angle / 180 * Math.PI));
        } else if(this.isBelow) {
            return this.x2 + ((this.nodeHeight / 2) / Math.tan(this.angle / 180 * Math.PI));
        }
    }

    public get arrowY(): number {
        if(this.isLeft) {
            return this.y2 - ((this.nodeWidth / 2) * Math.tan(this.angle / 180 * Math.PI));
        } else if(this.isRight) {
            return this.y2 + ((this.nodeWidth / 2) * Math.tan(this.angle / 180 * Math.PI));
        } else if(this.isTop) {
            return this.y2 - this.nodeHeight / 2;
        } else if(this.isBelow) {
            return this.y2 + this.nodeHeight / 2;
        }
    }

    private get angle(): number {
        return Angles.angle(this);
    }

    private get sourceNode(): CEGNode {
        return this.getNode(this.connection.source);
    }

    private get targetNode(): CEGNode {
        return this.getNode(this.connection.target);
    }

    private get isNegated(): boolean {
        // Recently, the negate property is sometimes sent as string from the server. We workaround this easily here.
        return (this.connection.negate + '').toLowerCase() === 'true';
    }

    private getNode(proxy: Proxy): CEGNode {
        if (!proxy) {
            throw new Error('Tried to get element for undefined proxy!');
        }
        return this.nodes.filter((containedNode: CEGNode) => containedNode.url === proxy.url)[0];
    }
}
