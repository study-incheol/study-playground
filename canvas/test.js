// lerp: https://www.youtube.com/watch?v=NzjF1pdlK7Y

export class App {
constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);
        
        window.addEventListener('resize', this.resize.bind(this));
        this.resize();
        this.init();
    }

    겹치는사각형그리기2() {
        this.ctx.fillRect(25,25,100,100)
        this.ctx.clearRect(45,45,60,60)
        this.ctx.strokeRect(50,50,50,50)
    }

    겹치는사각형그리기() {
        this.ctx.fillStyle = 'green';
        this.ctx.fillRect(10, 20, 50, 50);
        
        this.ctx.fillStyle = "rgb( 0 0 200 / 50%)";
        this.ctx.fillRect(15, 25, 50, 50);
    }
    
    pathtest() {
        this.ctx.beginPath();
        this.ctx.lineTo(100, 100);
        this.ctx.lineTo(100, 200);
        this.ctx.lineTo(200,200);
        this.ctx.stroke();
    }

    closePath() {
        // 첫 시작점과 직선으로 선을 마무리(close)
        this.ctx.beginPath();
        this.ctx.moveTo(100, 100);
        this.ctx.lineTo(100, 200);
        this.ctx.lineTo(200, 200);
        this.ctx.closePath();
        this.ctx.stroke();

        
        // 이미 close되어있기때문에 아무것도 안함.
        this.ctx.beginPath();
        this.ctx.moveTo(300,300);
        this.ctx.lineTo(300,400);
        this.ctx.lineTo(400,400);
        this.ctx.lineTo(300,300);
        this.ctx.closePath();
        this.ctx.stroke();

        // fill 메소드는 자동으로 close
        this.ctx.beginPath();
        this.ctx.moveTo(300,100);
        this.ctx.lineTo(300,200);
        this.ctx.lineTo(400,200);
        this.ctx.fill();
    }

    arcTest() {
        this.ctx.beginPath();
        this.ctx.arc(200, 200, 50, 0, Math.PI * 2);
        this.ctx.moveTo(190,180) // move를 원의 둘레에 맞게 찍어야함.
        this.ctx.arc(180, 180, 10, 0, Math.PI * 2);
        this.ctx.moveTo(230,180);
        this.ctx.arc(220, 180, 10, 0, Math.PI * 2);
        this.ctx.moveTo(240,200)
        this.ctx.arc(200,200,40,0,Math.PI)
        this.ctx.stroke();
    }

    arcToTest() {
       this.ctx.beginPath();
       this.ctx.moveTo(200,200);
       // control point 1,2
       this.ctx.arcTo(250,250,200,300,30);
       this.ctx.lineTo(200,300);
       this.ctx.stroke();
       this.ctx.strokeStyle = 'red'
       this.ctx.beginPath();
       this.ctx.moveTo(200,200);   
       this.ctx.lineTo(250,250);
       this.ctx.lineTo(200,300);
       this.ctx.stroke();

       // start
       this.ctx.fillStyle = 'green'
       this.ctx.beginPath()
       this.ctx.arc(200,200,2,0,2*Math.PI)
       this.ctx.fill()
        
       this.ctx.fillStyle = 'blue'
       this.ctx.beginPath()
       this.ctx.arc(250,250,2,0,2*Math.PI)
       this.ctx.arc(200,300,2,0,2*Math.PI)
       this.ctx.fill()

    
    }

    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;

        console.log(this.stageWidth, this.stageHeight);
        this.canvas.width = this.stageWidth*2;
        this.canvas.height = this.stageHeight*2;
        this.ctx.scale(2, 2);
    }

    drawT1() {
        const paths = []
        let currentX = 100, currentY = 100;
        
        paths.push(()=>{
            this.ctx.moveTo(currentX, currentY);
            this.ctx.lineTo(300,100);
            currentX = 300; currentY = 100;
        });
        paths.push(()=>{
            this.ctx.moveTo(currentX, currentY);
            this.ctx.bezierCurveTo(290,120,280,120,270,120);
            currentX = 270; currentY = 120;
        });
        paths.push(()=>{
            this.ctx.moveTo(currentX, currentY);
            this.ctx.lineTo(220,220);
            currentX = 220; currentY = 220;
        });
        paths.push(()=>{
            this.ctx.moveTo(currentX, currentY);
            this.ctx.bezierCurveTo(215,220,210,220,205,205);
            currentX = 205; currentY = 205;
        });
        paths.push(()=>{
            this.ctx.moveTo(currentX, currentY);
            this.ctx.lineTo(250,120);
            currentX = 250; currentY = 120;
        });
        paths.push(()=>{
            this.ctx.moveTo(currentX, currentY);
            this.ctx.lineTo(120,120);
            currentX = 120; currentY = 120;
        });
        paths.push(()=>{
            this.ctx.moveTo(currentX, currentY);
            this.ctx.bezierCurveTo(115,120,110,120,100,100);
            currentX = 100; currentY = 100;
        });

        // moveto
        // 230, 130
        
        // 2
        paths.push(()=>{
            this.ctx.moveTo(230,130);
            this.ctx.lineTo(220,150);
            currentX = 220; currentY = 150;
        });
        // 5/3
        paths.push(()=>{
            this.ctx.moveTo(currentX, currentY);
            this.ctx.lineTo(140,150);
            currentX = 140; currentY = 150;
        });
        paths.push(()=>{
            this.ctx.moveTo(currentX, currentY);
            this.ctx.bezierCurveTo(130,150,115,130,120,130);
            currentX = 120; currentY = 130;
        });
        paths.push(()=>{
            this.ctx.moveTo(currentX, currentY);
            this.ctx.lineTo(230,130);
            currentX = 230; currentY = 130;
        });
        
        // 215 155
        
        paths.push(()=>{
            this.ctx.moveTo(215,155);
            this.ctx.lineTo(205,175);
            currentX = 205; currentY = 175;
        });
        paths.push(()=>{
            this.ctx.moveTo(currentX, currentY);
            this.ctx.lineTo(150,175);
            currentX = 150; currentY = 175;
        });
        paths.push(()=>{
            this.ctx.moveTo(currentX, currentY);
            this.ctx.bezierCurveTo(140,175,130,155,130,155);
            currentX = 130; currentY = 155;
        });
        paths.push(()=>{
            this.ctx.moveTo(currentX, currentY);
            this.ctx.lineTo(215,155);
            currentX = 215; currentY = 155;
        });

        // 200 185
        
        paths.push(()=>{
            this.ctx.moveTo(200,180);
            this.ctx.lineTo(190,200);
            currentX = 190; currentY = 200;
        });
        paths.push(()=>{
            this.ctx.moveTo(currentX, currentY);
            this.ctx.lineTo(170,200);
            currentX = 170; currentY = 200;
        });
        paths.push(()=>{
            this.ctx.moveTo(currentX, currentY);
            this.ctx.bezierCurveTo(160,200,150,180,150,180);
            currentX = 150; currentY = 180;
        });
        paths.push(()=>{
            this.ctx.moveTo(currentX, currentY);
            this.ctx.lineTo(200,180);
            currentX = 200; currentY = 180;
        });

        
        paths.push(()=>{
            this.ctx.moveTo(305,100);
            this.ctx.lineTo(335,100);
            currentX = 335; currentY = 100;
        });
        paths.push(()=>{
            this.ctx.moveTo(currentX, currentY);
            this.ctx.lineTo(275,220);
            currentX = 275; currentY = 220;
        });
        paths.push(()=>{
            this.ctx.moveTo(currentX, currentY);
            this.ctx.bezierCurveTo(260,220,255,205,255,205);
            currentX = 255; currentY = 205;
        });
        paths.push(()=>{
            this.ctx.moveTo(currentX, currentY);
            this.ctx.lineTo(300,120);
            currentX = 300; currentY = 120;
        });
        paths.push(()=>{
            this.ctx.moveTo(currentX, currentY);
            this.ctx.lineTo(290,120);
            currentX = 290; currentY = 120;
        });
        paths.push(()=>{
            this.ctx.moveTo(currentX, currentY);
            this.ctx.bezierCurveTo(295,120,310,100,305,100);
            currentX = 305; currentY = 100;
        });
        
        const pathLength = paths.length
        // 
        // 좀 더 다양한 레드 계열의 이쁜 색상 조합 추천
        const colors = this.generate_colors([
            [255, 0, 0],   // 밝은 레드
            [255, 0, 170],   // 크림슨
        ], pathLength)
        let i =0;
        for( const path of paths) {
            this.ctx.beginPath();
            this.ctx.moveTo(currentX,currentY);
            this.ctx.strokeStyle = this.toRgbString(colors[i++])
            path()
            this.ctx.stroke();
        }
        
    }

    drawT2() {
        this.ctx.beginPath();        
        this.ctx.moveTo(100, 100);
        this.ctx.lineTo(300,100);
        this.ctx.bezierCurveTo(290,120,280,120,270,120);

        this.ctx.lineTo(220,220);
        this.ctx.bezierCurveTo(215,220,210,220,205,205);

        this.ctx.lineTo(250,120);
        this.ctx.lineTo(120,120);
        this.ctx.bezierCurveTo(115,120,110,120,100,100);

        this.ctx.moveTo(230,130);
        this.ctx.lineTo(220,150);

        // 5/3
        this.ctx.lineTo(140,150);
        this.ctx.bezierCurveTo(130,150,115,130,120,130);

        this.ctx.lineTo(230,130);

        // 215 155
        this.ctx.moveTo(215,155);
        this.ctx.lineTo(205,175);

        this.ctx.lineTo(150,175);

        this.ctx.bezierCurveTo(140,175,130,155,130,155);

        this.ctx.lineTo(215,155);

        // 200 185
        this.ctx.moveTo(200,180);
        this.ctx.lineTo(190,200);

        this.ctx.lineTo(170,200);

        this.ctx.bezierCurveTo(160,200,150,180,150,180);

        this.ctx.lineTo(200,180);

        this.ctx.moveTo(305,100);
        this.ctx.lineTo(335,100);

        this.ctx.lineTo(275,220);

        this.ctx.bezierCurveTo(260,220,255,205,255,205);

        this.ctx.lineTo(300,120);

        this.ctx.lineTo(290,120);

        this.ctx.bezierCurveTo(295,120,310,100,305,100);

        const colors = this.generate_colors([
            [255,0,0],
            [255,255,127],
            [255,127,255],
        ], 10)
        const radialGradient = this.ctx.createRadialGradient(150,150,50,350,200,100)
        // this.ctx.fill()
        this.ctx.stroke()
        const linearGradient = this.ctx.createLinearGradient(100,100,300,300)
        // let i =0;
        // for ( const color of colors) {
            //     linearGradient.addColorStop(i++/(colors.length-1), this.toRgbString(color))
            // }
        radialGradient.addColorStop(0, 'orange')
        radialGradient.addColorStop(1, 'red')
        this.ctx.fillStyle = radialGradient
        this.ctx.fill();
        
    }

    colors() {
        const colors = [[255,0,0], [0,0,255], [0,255,0], [255,255,255], [0,0,0]];
        const length = 10
        const graientColors = this.generate_colors(colors,length);
        // linear gradient
        const linearGradient = this.ctx.createLinearGradient(0,0,100,100) // 세로로 0-100 일때에만 적용
        for( let i= 0; i < length; i++) {
            linearGradient.addColorStop(i/(length-1), this.toRgbString(graientColors[i]))
        }
        this.ctx.fillStyle = linearGradient
        this.ctx.fillRect(0,0,100,100) 
    }

    toRgbString(color, alpha = 1) {
        if( alpha != 1) {
            return `rgb(${color[0]} ${color[1]} ${color[2]} / ${alpha})`
        }
        return `rgb(${color[0]} ${color[1]} ${color[2]})`
    }

    generate_colors(colors, length) {
        if( colors.length === 1) {
            return new Array(length).fill(colors[0])
        } else if( colors.length === 2) {
            const result = []
            for( let i = 0; i < length; i++) { 
                const alpha = i / (length-1)
                result.push(this.interpolate_colors(colors[0],colors[1],alpha))
            }
            return result
        } else {
            const colorLength = colors.length
            const result = []
            for( let i = 0; i < length; i++) {
                const idx = i/(length-1) * (colorLength-1)
                const colorIndex = Math.floor(idx);
                const nextColorIndex = Math.min(colorIndex+1,colors.length-1);
                // 시작과 끝이 있고
                // 컬러가 3개, 구간은 5개
                const alpha = i/(length-1) * colorLength - colorIndex
                result.push(this.interpolate_colors(colors[colorIndex], colors[nextColorIndex],alpha))
            }
            return result;
        }
    }

    interpolate_colors(c1,c2,alpha) {
        return [c1[0]*(1-alpha) + alpha*c2[0],
        c1[1]*(1-alpha) + alpha*c2[1],
        c1[2]*(1-alpha) + alpha*c2[2]
        ]
    }
    
    transparent() {
        const circles = [
            {x :  100, y: 100, r: 50 , color: 'red'},
            {x: 60, y : 100 +40*Math.sqrt(3), r: 50, color: 'blue'},
            {x: 140, y : 100 +40*Math.sqrt(3), r: 50, color: 'green'},
        ]

        this.ctx.globalAlpha = 1
        for( const circle of circles) {
            this.ctx.beginPath()
            this.ctx.fillStyle = circle.color
            this.ctx.arc(circle.x, circle.y, circle.r, 0, Math.PI*2)
            this.ctx.fill()
        }
        this.ctx.globalAlpha = 1
    }

    
    drawT1byLineTo() {
        const pathArray = [
            ['m', 100, 100],
            ['l', 300, 100],
            ['b', 270, 120, 290, 120, 280, 120],
            ['l', 220, 220],
            ['b', 205, 205, 215, 220, 210, 220],
            ['l', 250, 120],
            ['l', 120, 120],
            ['b', 100, 100, 115, 120, 110, 120],
            ['m', 230, 130],
            ['l', 220, 150],
            ['l', 140, 150],
            ['b', 120, 130, 130, 150, 115, 130],
            ['l', 230, 130],
            ['m', 215, 155],
            ['l', 205, 175],
            ['l', 150, 175],
            ['b', 130, 155, 140, 175, 130, 155],
            ['l', 215, 155],
            ['m', 200, 180],
            ['l', 190, 200],
            ['l', 170, 200],
            ['b', 150, 180, 160, 200, 150, 180],
            ['l', 200, 180],
            ['m', 305, 100],
            ['l', 335, 100],
            ['l', 275, 220],
            ['b', 255, 205, 260, 220, 255, 205],
            ['l', 300, 120],
            ['l', 290, 120],
            ['b', 305, 100, 295, 120, 310, 100]
        ];
        let idx = 0;
        let speed = 60;
        let prev = null; //[ x,y ]
        const splitPaths = pathArray.flatMap(path => {
            if( path[0] === 'm') {
                prev = [path[1],path[2]]
                return [path]
            } else if( path[0] === 'l') {
                // speed만큼 구간을 나눈다.
                const dest = [path[1],path[2]]
                const result = []
                for( let i = 1; i <= speed; i++) {
                    const t = i/speed;
                    const pos = this.lerp(prev, dest, t)
                    result.push(['l',pos[0],pos[1]])
                    prev = pos;
                }
                return result
            } else if( path[0] === 'b') {
                const dest = [path[1],path[2]]
                const result = []
                for( let i = 1; i <= speed; i++) {
                    const t = i/speed;
                    const pos = this.beizer(t,prev[0],prev[1],path[3],path[4],path[5],path[6],path[1],path[2])
                    result.push(['b',pos[0],pos[1],path[3],path[4],path[5],path[6]])
                    prev = pos;
                }
                return result
            }
        })

        console.log(splitPaths)

        // 40번에 걸쳐서 하나씩 진행 
        
        this.ctx.beginPath()
        const nextState = (pos) => {
            idx++;
            prev = pos;
        }

        const animate = t => {
            const path = splitPaths[idx++]
            if( idx >= splitPaths.length) {
                idx = 0;
                return;
            }
            if( path) {
                if( path[0] === 'm') {
                    this.ctx.moveTo(path[1], path[2])
                } else if( path[0] === 'l') {
                    this.ctx.lineTo(path[1], path[2])
                } else if( path[0] === 'b') {
                    // this.ctx.bezierCurveTo(path[3], path[4], path[5], path[6], path[1], path[2])
                    this.ctx.lineTo(path[1], path[2])
                }
                this.ctx.strokeStyle = 'red'
                this.ctx.stroke()
                
                requestAnimationFrame(animate);
            }
        }
        // start animation
        animate();
    }

    distance(x1,y1,x2,y2) {
        let a = (x2-x1)
        let b = (y2-y1)
        return Math.sqrt(a*a +b*b)
    }
    distanceBeizer(x1,y1,x2,y2,x3,y3,x4,y4) {
        let sample = 40;
        let prevx = x1
        let prevy = y1
        let totalLength = 0;
        
        // next x,y
        for(let i = 1; i < sample ; i++) {
            let [nextx,nexty] = this.beizer(i/sample,x1,y1,x2,y2,x3,y3,x4,y4)
            let length = this.distance(prevx,prevy,nextx,nexty)
            totalLength += length
            prevx = nextx
            prevy = nexty
        }
        totalLength += this.distance(prevx,prevy,x4,y4)
        
        return totalLength
    }

    getAllLengthInfos(paths) {
        let totalLength = 0;
        let prevX = 0;
        let prevY = 0;
        let id = 0;
        let prevMove = false;
        let pathInfos = paths.flatMap(path => {
                let result = []
                // move를 넣어줘서 한획씩 stroke하도록 변경
                if(!prevMove) {
                    result.push({path:['m',prevX,prevY],length:0,id: id++})
                }
                // type check 
                if( path[0] == 'm') {
                    // prev 업데이트
                    prevX = path[1];
                    prevY = path[2];
                    prevMove = true;
                    
                    return result.concat([{path: path, length: 0, id: id++}]);
                } else if( path[0] == 'l') {
                    let dist = this.distance(prevX,prevY,path[1],path[2]);
                    totalLength += dist;
                    
                    // prev 업데이트
                    prevX = path[1];
                    prevY = path[2];
                    prevMove = false;
                    return result.concat({path: path, length: dist, id: id++});
                } else if( path[0] == 'b') {
                    let dist = this.distanceBeizer(prevX,prevY,path[3],path[4],path[5],path[6],path[1],path[2])
                    totalLength += dist;
                    
                    // prev 업데이트
                    prevX = path[1];
                    prevY = path[2];
                    prevMove = false;
                    return result.concat({path: path, length: dist, id: id++})
                }

                
            })
        return {
            p: pathInfos,
            l : totalLength
        }
    }
    
    // inverse lerp(진행률을 구한다) + lerp(진행률을 통해서 rmin - rmax 사이값을 구한다.) + clamp(min,max로 자르기)
    localProgress(v,vmin,vmax,rmin,rmax) {
        let result = (v-vmin) / (vmax - vmin) * (rmax-rmin) + rmin
        if( result <= rmin) result = rmin
        else if( result >= rmax) result = rmax
        return result
    }
    drawT1byDash() {
        // beizer 1,2가 종착지
        const pathArray = [
            ['m', 100, 100],
            ['l', 300, 100],
            ['b', 270, 120, 290, 120, 280, 120],
            ['l', 220, 220],
            ['b', 205, 205, 215, 220, 210, 220],
            ['l', 250, 120],
            ['l', 120, 120],
            ['b', 100, 100, 115, 120, 110, 120],
            ['m', 230, 130],
            ['l', 220, 150],
            ['l', 140, 150],
            ['b', 120, 130, 130, 150, 115, 130],
            ['l', 230, 130],
            ['m', 215, 155],
            ['l', 205, 175],
            ['l', 150, 175],
            ['b', 130, 155, 140, 175, 130, 155],
            ['l', 215, 155],
            ['m', 200, 180],
            ['l', 190, 200],
            ['l', 170, 200],
            ['b', 150, 180, 160, 200, 150, 180],
            ['l', 200, 180],
            ['m', 305, 100],
            ['l', 335, 100],
            ['l', 275, 220],
            ['b', 255, 205, 260, 220, 255, 205],
            ['l', 300, 120],
            ['l', 290, 120],
            ['b', 305, 100, 295, 120, 310, 100]
        ];
        
        let pathInfos = this.getAllLengthInfos(pathArray);
        let totalLength = pathInfos.l
        console.log(pathInfos);

        let currentRatio = 0;
        // 각 구간별 비율구간을 정하고
        for( let pathInfo of pathInfos.p) {
            let pathRatio = pathInfo.length / totalLength
            pathInfo.startRatio = currentRatio;
            pathInfo.endRatio = currentRatio + pathRatio;
            currentRatio += pathRatio;
        }
        // 60fps 라고할때, 10초 600기준으로 테스트 
        let cnt = 0;
        let colors = [[230,80,70],[250,220,100],[120,190,220],[0,0,0]]
        let loss = [0,.05,.07,.09]
        const animate = t => {
            this.ctx.clearRect(0,0,this.stageWidth,this.stageHeight);
            let progress = (cnt++ / 600)
            let colorIdx = 0 
            this.ctx.lineCap = 'round'
            this.ctx.lineWidth = 4;
            for (let color of colors) {
                let colorProgress = progress - loss[colorIdx++] 
                if( colorProgress <= 0) colorProgress = 0
                for(let pathInfo of pathInfos.p) {
                    let path = pathInfo.path
                    // 그려야할 길이
                    // 전체 진행비율 -> 내단계 비율
                    let localProgress = this.localProgress(colorProgress,pathInfo.startRatio,pathInfo.endRatio,0,1);
                    if( path[0] === 'm') {
                        this.ctx.beginPath()
                        this.ctx.moveTo(path[1],path[2])
                    } else if( path[0] === 'l') {
                        // percentage 적용
                        if( localProgress > 0) {
                            let length = localProgress * pathInfo.length
                            this.ctx.lineTo(path[1],path[2])
                            this.ctx.setLineDash([pathInfo.length])
                            this.ctx.lineDashOffset = -(pathInfo.length+length)
                            this.ctx.strokeStyle = this.toRgbString(color)
                            this.ctx.stroke()
                        }
                        
                    } else if( path[0] === 'b') {
                        if( localProgress > 0) {
                            let maxLength = pathInfo.length;
                            let length = localProgress * maxLength
                            console.log('local', localProgress, length, maxLength)
                            this.ctx.bezierCurveTo(path[3],path[4],path[5],path[6],path[1],path[2])
                            this.ctx.setLineDash([maxLength])
                            this.ctx.lineDashOffset = -(maxLength+length)
                            this.ctx.strokeStyle = this.toRgbString(color)
                            this.ctx.stroke()
                        }
                    }
                }
            }
            // if( progress > 1.15) {
            //     let width = this.lerp1(1,10,(cnt / 100) % 1)
            //     console.log('progress', progress,width)
            //     this.ctx.lineWidth = width;
            //     this.ctx.fill();
            // }
            requestAnimationFrame(animate)
        }
        
        // start animation
        animate();
    }

    beizer(t,x1,y1,x2,y2,x3,y3,x4,y4) {
        x1 += (x2-x1) * t
        x2 += (x3-x2) * t
        x3 += (x4-x3) * t
        x1 += (x2-x1) * t
        x2 += (x3-x2) * t
        x1 += (x2-x1) * t
        y1 += (y2-y1) * t
        y2 += (y3-y2) * t
        y3 += (y4-y3) * t
        y1 += (y2-y1) * t
        y2 += (y3-y2) * t
        y1 += (y2-y1) * t
        return [x1,y1]
    }

    lerp(start, end, t) {
        // 1-t * start + t * end
        return [start[0] + (end[0] - start[0]) * t, start[1] + (end[1] - start[1]) * t]
    }

    lerp1(start, end, t) {
        return start + (end - start )* t
    }

    followBall() {
        this.ctx.beginPath();
        // 1280 647
        // /2 => 640 323 이동 시 안보임
        // /4 => 320 161 이동 시 가운데
        const centerY = this.stageHeight / 4
        const canvasHeight = this.stageHeight/2
        const canvasWidth = this.stageWidth/2-100
        const ball = {
            x: this.stageWidth/2-100,
            y: centerY,
            r: 3,
            tail: [],
            moving: false,
            targety: 0,
            color: [230,80,70],
            fps: 1,
            saveY() {
                this.tail.push(this.y)
                if( this.tail.length > canvasWidth) {
                    this.tail.shift();
                }
            }
        }

        const ball2 = {
            x: this.stageWidth/2-100,
            y: centerY - 250,
            r: 3,
            tail: [],
            moving: false,
            targety: 0,
            fps: 1,
            color: [120,90,220],
            saveY() {
                this.tail.push(this.y)
                if( this.tail.length > canvasWidth) {
                    this.tail.shift();
                }
            }
        }
        

        const animate = t => {
            this.ctx.clearRect(0,0,this.stageWidth,this.stageHeight)
            // update ball y
            if ( !ball.moving) {
                let targety = centerY + canvasHeight * 0.3 * Math.random()

                if( targety >= canvasHeight) targety = canvasHeight
                if( targety <= 0) targety = 0;

                ball.targety = targety;
                // ball.y = this.lerp1(ball.y, targety, 0.05)
                // ball.speed = (targety - ball.y) * 0.03 
                ball.y += (targety - ball.y) * 0.05 
                ball.moving = true
            } else {
                // ball.y = this.lerp1(ball.y, ball.targety, 0.05)
                ball.y += (ball.targety - ball.y) * 0.05

                if( Math.abs(ball.targety - ball.y) < 0.03) {
                    ball.moving = false
                    ball.fps = 1;
                }
            }

            //ball2 follow ball
            ball2.y += (ball.y - ball2.y) * 0.05
            
            // draw tail
            // a b c
            ball.saveY();
            ball2.saveY();
            const balls = [ball,ball2]
            for( let j =0 ; j < 2 ; j++) {
                
                const ball = balls[j];
                
                this.ctx.beginPath();
                this.ctx.moveTo(ball.x,ball.y)
                // [1], [1,2], [1,2,3]
                for( let i=ball.tail.length-1; i >= 0 ; i--) {
                    const currentY = ball.tail[i];
                    this.ctx.lineTo(ball.x-(ball.tail.length -i),currentY)
                }
                const g = this.ctx.createLinearGradient(0,0, ball.x, 0);
                g.addColorStop(0.1, this.toRgbString(ball.color,0.1))
                g.addColorStop(1, this.toRgbString(ball.color))
                this.ctx.strokeStyle = g;
                this.ctx.stroke();

                // draw ball
                // radial
                this.ctx.beginPath();
                this.ctx.arc(ball.x, ball.y,ball.r,0,2*Math.PI);    
                this.ctx.fillStyle = this.toRgbString(ball.color)
                this.ctx.fill();
            }
            
            
            requestAnimationFrame(animate.bind(this))
            
        }
        
        
        console.log(this.stageWidth , this.stageHeight);
        
        
        animate.call(this);
    }

    simpleAnimation() {
        const radius = 3;
        const speed = 0.01;
        const max = 10 * Math.random() + 30;
        let time = 0;
        const animate = t => {
            this.ctx.clearRect(0,0,this.stageWidth,this.stageHeight) 
            time += speed
            let currentRadius = radius + (0.5 *Math.sin(time) * max)
            console.log(time,currentRadius)

            if( currentRadius <= 0 ) currentRadius = 0.01;
            
            this.ctx.beginPath()
            this.ctx.arc(100,100,currentRadius,0,2*Math.PI);
            this.ctx.fill();
            
            
            requestAnimationFrame(animate)
        }

        animate()
    }

    lerpNumber() {
        this.lerp1()
        let time = 0
        let speed = 0.003
        const animate = t=> {
            this.ctx.clearRect(0,0,this.stageWidth,this.stageHeight);
            // if( time >= 1 ) {
            //     speed *= -1
            //     time = 1
            // } 
            // if( time <= 0 ) {
            //     speed *= -1
            //     time = 0
            // }
            time += speed;
            let progress = Math.sin(time) 
            if(progress >= 1) progress = 1
            else if( progress <= 0) progress= 0
            const value = this.lerp1(13,26,progress)
            this.ctx.fillText(`${value.toFixed(1)}`,100,100)
            requestAnimationFrame(animate)
        }
        animate();
    }

    lerpPosition() {
        const a = {x:100,y:100}
        const b = {x:150,y:200}
        let time = 0;
        let speed = 0.01
        const animate = t => {
            time += speed
            if( time >= 1) {
                time = 1
                speed *= -1
            }
            if (time <= 0 ) {
                time = 0
                speed *= -1
            }
             
            this.ctx.clearRect(0,0,this.stageWidth,this.stageHeight);

            this.ctx.fillStyle= 'black'
            this.ctx.beginPath()
            this.ctx.moveTo(a.x,a.y)
            this.ctx.lineTo(b.x,b.y)
            this.ctx.lineWidth=3
            this.ctx.stroke()

            this.ctx.beginPath()
            this.ctx.arc(a.x,a.y,5,0,Math.PI*2)
            this.ctx.fillStyle = 'blue'
            this.ctx.fill()

            this.ctx.beginPath()
            this.ctx.arc(b.x,b.y,5,0,Math.PI*2)
            this.ctx.fillStyle = 'red'
            this.ctx.fill()
           
            const cx = this.lerp1(a.x,b.x,Math.sin(time*Math.PI))
            const cy = this.lerp1(a.y,b.y,Math.sin(time*Math.PI))
            
            this.ctx.beginPath()
            this.ctx.arc(cx,cy,5,0,Math.PI*2)
            this.ctx.fillStyle = 'green'
            this.ctx.fill()

            requestAnimationFrame(animate)
        }
        animate();
    }

    lerpColor() {
        const a = {x:100,y:100}
        const b = {x:150,y:200}
        const ac = [230,80,70]
        const bc = [250,220,100]
        let time = 0;
        let speed = 0.01
        const animate = t => {
            time += speed
            if( time >= 1) {
                time = 1
                speed *= -1
            }
            if (time <= 0 ) {
                time = 0
                speed *= -1
            }
             
            this.ctx.clearRect(0,0,this.stageWidth,this.stageHeight);

            this.ctx.fillStyle= 'black'
            this.ctx.beginPath()
            this.ctx.moveTo(a.x,a.y)
            this.ctx.lineTo(b.x,b.y)
            this.ctx.lineWidth=3
            this.ctx.stroke()

            this.ctx.beginPath()
            this.ctx.arc(a.x,a.y,5,0,Math.PI*2)
            this.ctx.fillStyle = this.toRgbString(ac)
            this.ctx.fill()

            this.ctx.beginPath()
            this.ctx.arc(b.x,b.y,5,0,Math.PI*2)
            this.ctx.fillStyle = this.toRgbString(bc)
            this.ctx.fill()
           
            const cx = this.lerp1(a.x,b.x,Math.sin(time*Math.PI))
            const cy = this.lerp1(a.y,b.y,Math.sin(time*Math.PI))
            const ccr = this.lerp1(ac[0],bc[0],Math.sin(time*Math.PI));
            const ccg = this.lerp1(ac[1],bc[1],Math.sin(time*Math.PI));
            const ccb = this.lerp1(ac[2],bc[2],Math.sin(time*Math.PI));
            
            this.ctx.beginPath()
            this.ctx.arc(cx,cy,5,0,Math.PI*2)
            this.ctx.fillStyle = `rgb(${ccr} ${ccg} ${ccb})`
            this.ctx.fill()

            requestAnimationFrame(animate)
        }
        animate();
    }

    lerpSpace() {
        let colors = [[230,80,70],[250,220,100],[120,190,220],[0,0,0]]

        const img = new Image();
        img.src = 'image2.png'
        img.onload = () => {
            const result =[]

            this.ctx.drawImage(img,30,30,100,100)
            const copy = this.ctx.getImageData(60,60,200,200)
            console.log(copy)
            for(let i = 0; i < 200 ; i++) {
                const row=[]
                for( let j =0; j < 200; j++) {
                    let tot= 0
                    for( let k = 0; k < 3; k++) {
                        tot += copy.data[(i*200 + j)*4+k]
                        tot /= 255 * 3
                    }
                    row.push(tot)
                }
                result.push(row)
            }

            const imageData = this.ctx.createImageData(200,200);
            const data = imageData.data;
            console.log(data)
            for(let i = 0; i < 200 ; i++) {
                for( let j =0; j < 200; j++) {
                    const r = this.lerp1(colors[0][0],colors[3][0],result[i][j])
                    const g = this.lerp1(colors[0][1],colors[3][1],result[i][j])
                    const b = this.lerp1(colors[0][2],colors[3][2],result[i][j])
                    const cur = (200*i+j)*4;
                    data[cur] = r
                    data[cur+1] = g
                    data[cur+2] = b
                    data[cur+3] = 255
                }
            }
            this.ctx.putImageData(imageData,300,300)

        }
    }

    init() {
        // this.겹치는사각형그리기2();
        // this.pathtest();
        // this.closePath();
        // this.arcTest();
        // this.arcToTest();
        // this.drawT1();
        // this.drawT2();
        // this.colors();
        // this.transparent(); // 정적 버전
        // this.simpleAnimation();
        // this.lerpNumber();
        // this.lerpPosition();
        // this.lerpColor();
        // this.lerpSpace();
        // this.drawT1byLineTo();
        // this.drawT1byDash();
        this.followBall();
        


        // this.ctx.beginPath();
        // this.ctx.strokeStyle = 'red';
        // this.ctx.moveTo(100,100);
        // this.ctx.lineTo(200,200);
        // this.ctx.stroke();
        // this.ctx.beginPath();
        // this.ctx.strokeStyle = 'blue';
        // this.ctx.moveTo(200,200);
        // this.ctx.lineTo(300,300);
        // this.ctx.stroke();
    }
}

window.onload = () => {
    const app = new App();
}
