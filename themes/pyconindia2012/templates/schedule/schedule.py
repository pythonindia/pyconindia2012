import json
import sys

def read_talks():
    d = json.load(open("alltalks.json"))
    return dict((t['id'], t) for t in d['proposals'])

def render_talk(id, index=0):
    talk = talks[id]
    if index == 3:
        klass = "span2-5"
    else:
        klass = "span2-5"
    print '    <div class="span2 %s">' % klass
    print '      <h4><a href="%s">%s</a></h4>' % (talk['url'].encode('utf-8'), talk['title'].encode('utf-8'))
    print '      <p>%s</p>' % talk['speaker']
    print '    </div>'

def render_alltracks(name):
    print '      <div class="span10 all-tracks">%s</div>' % name

def render_item(name, index=0):
    if name.startswith("*"):
        return render_alltracks(name[1:])
    else:
	return render_talk(int(name), index=index)

def render_row(time, fields):
    print '  <li class="row-fluid item">'
    print '     <div class="span2">%s</div>' % time
    for i, field in enumerate(fields):
	render_item(field, i)
    print '  </li>'

talks = read_talks()
rows = [row.strip().split(None, 1) for row in open(sys.argv[1]) 
        if row.strip() and not row.strip().startswith("#")]

for time, fields in rows:
    fields = fields.split(",")
    render_row(time, fields)
